<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\MaterialRequest;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialRequestController extends Controller
{
    public function index()
    {
        // প্রোডাকশন ম্যানেজারদের পাঠানো সব রিকোয়েস্ট আনা হচ্ছে (User রিলেশনসহ)
        $requests = MaterialRequest::with('user')
            ->latest()
            ->get()
            ->map(function ($req) {
                return [
                    'id' => $req->id,
                    'item_name' => $req->item_name,
                    'item_code' => $req->item_code,
                    'qty' => $req->quantity,
                    'unit' => $req->unit,
                    'requested_by' => $req->user->name ?? 'Unknown',
                    'dept' => 'Production Floor', // বা ইউজারের ডিপার্টমেন্ট থাকলে সেটা দিবেন
                    'date' => $req->created_at->format('d M, Y'),
                    'status' => ucfirst($req->status), // Pending, Approved, Rejected, Stock Out
                    'reason' => $req->reason ?? 'No note provided'
                ];
            });

        return Inertia::render('Inventory_manager/MaterialRequest', [
            'requests' => $requests
        ]);
    }
    public function updateStatus(Request $request, $id)
    {
        $materialRequest = MaterialRequest::findOrFail($id);
        $materialRequest->update([
            'status' => $request->status // approved/rejected
        ]);

        return back()->with('success', 'Status updated successfully!');
    }
}