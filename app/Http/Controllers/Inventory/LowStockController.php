<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\InventoryTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LowStockController extends Controller
{
    public function index(Request $request)
    {
        $lowStockItems = Inventory::whereColumn('quantity', '<=', 'min_stock_level')
            ->where('quantity', '>', 0)
            ->latest()
            ->get()
            ->map(function ($item) {
                $lastOut = InventoryTransaction::where('inventory_id', $item->id)
                    ->where('type', 'out')
                    ->latest()
                    ->first();

                return [
                    'id' => $item->id,
                    'name' => $item->item_name,
                    'code' => $item->item_code,
                    'current_stock' => (float) $item->quantity,
                    'min_level' => (float) $item->min_stock_level,
                    'unit' => $item->unit,
                    'category' => $item->category,
                    'last_out' => $lastOut ? $lastOut->created_at->diffForHumans() : 'No recent movement',
                ];
            });
        $recentRestock = InventoryTransaction::with('inventory')
            ->where('type', 'in')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($log) {
                return [
                    'name' => $log->inventory->item_name ?? 'Unknown Item',
                    'qty_added' => '+' . $log->quantity . ' ' . ($log->inventory->unit ?? ''),
                    'time' => $log->created_at->format('d M, Y'),
                ];
            });
        return Inertia::render('Inventory_manager/LowStock', [
            'dbLowStockItems' => $lowStockItems,
            'recentRestock' => $recentRestock
        ]);
    }
}