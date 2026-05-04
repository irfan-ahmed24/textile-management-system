<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\InventoryTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockInController extends Controller
{
    /**
     * স্টক ইন পেজ ভিউ এবং রিসেন্ট ট্রানজেকশন ডাটা পাঠানো
     */
    public function index()
    {
        // সাম্প্রতিক ৫টি স্টক-ইন ডাটা ইনভেন্টরি নামসহ নিয়ে আসা
        $recentEntries = InventoryTransaction::with('inventory')
            ->where('type', 'in')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Inventory_manager/Stock_In', [
            'recentEntries' => $recentEntries
        ]);
    }
    public function store(Request $request)
    {
        // ১. ইনপুট ভ্যালিডেশন
        $validated = $request->validate([
            'item_code' => 'required|string',
            'item_name' => 'required|string',
            'category' => 'required|string',
            'quantity' => 'required|numeric|min:0.01',
            'unit' => 'required|string',
            'unit_price' => 'nullable|numeric',
            'warehouse_location' => 'nullable|string',
            'note' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $inventory = Inventory::updateOrCreate(
                    ['item_code' => $validated['item_code']],
                    [
                        'item_name' => $validated['item_name'],
                        'category' => $validated['category'],
                        'unit' => $validated['unit'],
                        'unit_price' => $validated['unit_price'],
                        'warehouse_location' => $validated['warehouse_location'],
                    ]
                );
                $inventory->increment('quantity', $validated['quantity']);
                InventoryTransaction::create([
                    'inventory_id' => $inventory->id,
                    'type' => 'in',
                    'quantity' => $validated['quantity'],
                    'reason' => 'Stock Received', // অথবা প্রোজেক্ট অনুযায়ী Dynamic দিতে পারেন
                    'reference_person' => 'Supplier / Store',
                    'user_id' => auth()->id(), // যে ম্যানেজার এন্ট্রি দিচ্ছে তার আইডি
                    'note' => $validated['note'] ?? 'Item received via QR/Manual Entry',
                ]);
            });

            return redirect()->back()->with('success', 'Inventory updated successfully!');

        } catch (\Exception $e) {
            // কোনো এরর হলে ইউজারকে জানানো
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }
}