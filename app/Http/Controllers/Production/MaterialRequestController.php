<?php

namespace App\Http\Controllers\Production;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\MaterialRequest as MaterialRequestModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MaterialRequestController extends Controller
{
    public function index()
    {
        // ডাটাবেস কলাম অনুযায়ী 'item_name', 'item_code' এবং 'quantity' সিলেক্ট করা হয়েছে
        $inventoryData = Inventory::select('id', 'item_name', 'item_code', 'quantity', 'unit')->get();

        $requestHistory = MaterialRequestModel::where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($req) {
                return [
                    'id' => $req->id,
                    'item_name' => $req->item_name,
                    'item_code' => $req->item_code,
                    'qty' => $req->quantity,
                    'unit' => $req->unit,
                    'date' => $req->created_at->format('d M'),
                    'status' => ucfirst($req->status),
                ];
            });

        return Inertia::render("Production_manager/MaterialRequest", [
            'inventoryItems' => $inventoryData,
            'requestHistory' => $requestHistory
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'inventory_id' => 'required|exists:inventories,id',
            'quantity' => 'required|numeric|min:1',
            'reason' => 'nullable|string'
        ]);

        // findOrFail ব্যবহার করা নিরাপদ
        $item = Inventory::findOrFail($request->inventory_id);

        MaterialRequestModel::create([
            'user_id' => Auth::id(),
            'inventory_id' => $item->id,
            // এখানে ভুল ছিল, কলামের নাম হবে item_name, item_code
            'item_name' => $item->item_name,
            'item_code' => $item->item_code,
            'quantity' => $request->quantity,
            'unit' => $item->unit,
            'reason' => $request->reason,
            'status' => 'pending'
        ]);

        return back()->with('success', 'Request sent to inventory manager!');
    }
}