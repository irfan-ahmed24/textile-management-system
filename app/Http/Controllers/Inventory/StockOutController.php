<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\InventoryTransaction;
use App\Models\MaterialRequest; // মডেলটি ইমপোর্ট করুন
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockOutController extends Controller
{
    /**
     * স্টক আউট পেজ ভিউ এবং ডাটা পাঠানো
     */
    public function index()
    {
        // সাম্প্রতিক ৫টি স্টক-আউট ডাটা নিয়ে আসা
        $recentOutlets = InventoryTransaction::with('inventory')
            ->where('type', 'out')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Inventory_manager/Stock_Out', [
            'recentEntries' => $recentOutlets
        ]);
    }

    /**
     * স্টক আউট প্রসেস করা এবং মেটেরিয়াল রিকোয়েস্ট আপডেট করা
     */
    public function store(Request $request)
    {
        // ১. ভ্যালিডেশন
        $validated = $request->validate([
            'request_id' => 'nullable|exists:material_requests,id', // রিকোয়েস্ট আইডি থাকলে চেক করবে
            'item_code' => 'required|string|exists:inventories,item_code',
            'quantity' => 'required|numeric|min:0.01',
            'recipient' => 'required|string|max:255',
            'reason' => 'required|string',
            'note' => 'nullable|string',
        ], [
            'item_code.exists' => 'This Item Code does not exist in our inventory.',
        ]);

        try {
            // ২. আইটেমটি খুঁজে বের করা
            $inventory = Inventory::where('item_code', $validated['item_code'])->firstOrFail();

            // ৩. স্টক চেক
            if ($inventory->quantity < $validated['quantity']) {
                return redirect()->back()->withErrors([
                    'quantity' => "Insufficient stock! Current balance: {$inventory->quantity} {$inventory->unit}"
                ]);
            }

            // ৪. ডাটাবেস ট্রানজেকশন শুরু
            DB::transaction(function () use ($validated, $inventory) {

                // ৫. মেইন ইনভেন্টরি থেকে স্টক কমানো
                $inventory->decrement('quantity', $validated['quantity']);

                // ৬. ট্রানজেকশন হিস্ট্রি সেভ করা
                InventoryTransaction::create([
                    'inventory_id' => $inventory->id,
                    'user_id' => auth()->id(),
                    'type' => 'out',
                    'quantity' => $validated['quantity'],
                    'reason' => $validated['reason'],
                    'reference_person' => $validated['recipient'],
                    'note' => $validated['note'] ?? 'Stock issued via Requisition/Manual',
                ]);

                // ৭. মেটেরিয়াল রিকোয়েস্ট টেবিল আপডেট (যদি QR বা ম্যানুয়ালি আইডি দেয়া হয়)
                if (!empty($validated['request_id'])) {
                    $materialRequest = MaterialRequest::find($validated['request_id']);
                    if ($materialRequest) {
                        $materialRequest->update([
                            'status' => 'Completed'
                        ]);
                    }
                }
            });

            return redirect()->back()->with('success', 'Stock issued and Requisition updated!');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Transaction failed: ' . $e->getMessage()]);
        }
    }
}