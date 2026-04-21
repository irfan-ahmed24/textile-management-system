<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\InventoryTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalItems = Inventory::count();
        $totalStockValue = Inventory::sum(DB::raw('quantity * unit_price'));
        $lowStockCount = Inventory::whereColumn('quantity', '<=', 'min_stock_level')->count();
        $outOfStockCount = Inventory::where('quantity', '<=', 0)->count();

        $inventoryStats = [
            ['label' => 'Total Items', 'value' => number_format($totalItems), 'change' => '+2', 'isPositive' => true],
            ['label' => 'Total Stock Value', 'value' => '$' . number_format($totalStockValue, 2), 'change' => '+12%', 'isPositive' => true],
            ['label' => 'Low Stock Alert', 'value' => $lowStockCount, 'change' => 'Requires Attention', 'isPositive' => false],
            ['label' => 'Out of Stock', 'value' => $outOfStockCount, 'change' => 'Critical', 'isPositive' => false],
        ];
        $movementLogs = InventoryTransaction::with('inventory')
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($log) {
                return [
                    'name' => $log->inventory->item_name ?? 'Unknown Item',
                    'type' => $log->type === 'in' ? 'Stock In' : 'Stock Out',
                    'qty' => ($log->type === 'in' ? '+' : '-') . number_format($log->quantity, 2) . ' ' . ($log->inventory->unit ?? ''),
                    'bg' => $log->type === 'in' ? 'bg-emerald-500/10' : 'bg-red-500/10',
                    'color' => $log->type === 'in' ? 'text-emerald-500' : 'text-red-500',
                    'time' => $log->created_at->diffForHumans(),
                ];
            });
        $criticalLowStockItems = Inventory::whereColumn('quantity', '<=', 'min_stock_level')
            ->orderBy('quantity', 'asc')
            ->take(4)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->item_name,
                    'code' => $item->item_code,
                    'stock' => (float) $item->quantity,
                    'min' => (float) $item->min_stock_level,
                    'unit' => $item->unit,
                ];
            });
        $storageHealth = [
            ['label' => 'Yarn Stock', 'value' => 65, 'color' => 'bg-blue-500'],
            ['label' => 'Fabric Stock', 'value' => 20, 'color' => 'bg-emerald-500'],
            ['label' => 'Chemicals', 'value' => 15, 'color' => 'bg-amber-500'],
        ];

        return Inertia::render('Inventory_manager/Dashboard', [
            'inventoryStats' => $inventoryStats,
            'movementLogs' => $movementLogs,
            'criticalLowStockItems' => $criticalLowStockItems,
            'storageHealth' => $storageHealth,
        ]);
    }
}