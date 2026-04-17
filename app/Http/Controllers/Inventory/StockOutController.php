<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\InventoryTransaction;
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
        // সাম্প্রতিক ৫টি স্টক-আউট ডাটা নিয়ে আসা
        $recentOutlets = InventoryTransaction::with('inventory')
            ->where('type', 'out')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Inventory_manager/Stock_Out', [
            'recentEntries' => $recentOutlets
        ]);
    }
    public function store(Request $request)
    {
        // ১. ভ্যালিডেশন
        $validated = $request->validate([
            'item_code' => 'required|string|exists:inventories,item_code', // আইটেমটি অবশ্যই ডাটাবেসে থাকতে হবে
            'quantity' => 'required|numeric|min:0.01',
            'recipient' => 'required|string|max:255',
            'reason' => 'required|string',
            'note' => 'nullable|string',
        ], [
            'item_code.exists' => 'This Item Code does not exist in our inventory.',
        ]);

        try {
            // ২. আইটেমটি খুঁজে বের করা
            $inventory = Inventory::where('item_code', $validated['item_code'])->first();

            // ৩. স্টক চেক (আপনার কাছে কি যথেষ্ট মাল আছে?)
            if ($inventory->quantity < $validated['quantity']) {
                return redirect()->back()->withErrors([
                    'quantity' => "Insufficient stock! Current balance: {$inventory->quantity} {$inventory->unit}"
                ]);
            }

            // ৪. ডাটাবেস ট্রানজেকশন শুরু
            DB::transaction(function () use ($validated, $inventory) {

                // ৫. মেইন ইনভেন্টরি থেকে স্টক কমানো
                $inventory->decrement('quantity', $validated['quantity']);

                // ৬. ট্রানজেকশন হিস্ট্রি সেভ করা (Stock Out Log)
                InventoryTransaction::create([
                    'inventory_id' => $inventory->id,
                    'user_id' => auth()->id(),
                    'type' => 'out',
                    'quantity' => $validated['quantity'],
                    'reason' => $validated['reason'],
                    'reference_person' => $validated['recipient'],
                    'note' => $validated['note'] ?? 'Stock issued for production/sale',
                ]);
            });

            return redirect()->back()->with('success', 'Stock issued successfully!');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Transaction failed: ' . $e->getMessage()]);
        }
    }
}