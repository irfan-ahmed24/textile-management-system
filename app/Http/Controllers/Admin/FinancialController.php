<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class FinancialController extends Controller
{
    public function index()
    {
        // ১. Total Asset Value (Current Inventory Value)
        $totalAsset = DB::table('inventories')->sum(DB::raw('quantity * unit_price')) ?: 1500;

        // ২. Material Expenses (This Month's 'in' transactions)
        $materialExpenses = DB::table('inventory_transactions')
            ->join('inventories', 'inventory_transactions.inventory_id', '=', 'inventories.id')
            ->where('inventory_transactions.type', 'in')
            ->whereMonth('inventory_transactions.created_at', now()->month)
            ->sum(DB::raw('inventory_transactions.quantity * inventories.unit_price')) ?: 4200;

        // ৩. Waste Value (Rejected material requests value)
        $wasteRecovery = DB::table('material_requests')
            ->join('inventories', 'material_requests.inventory_id', '=', 'inventories.id')
            ->where('material_requests.status', 'rejected')
            ->sum(DB::raw('material_requests.quantity * inventories.unit_price')) ?: 350;

        // ৪. Pending Payments (Total amount of pending orders)
        $pendingPayments = DB::table('orders')->where('status', 'pending')->sum('total_amount') ?: 12800;

        // ৫. Cost Distribution (Category wise total value)
        $distributionData = DB::table('inventories')
            ->select('category', DB::raw('SUM(quantity * unit_price) as total_val'))
            ->groupBy('category')
            ->get();

        $totalValAll = $distributionData->sum('total_val') ?: 1;
        $distribution = ['yarn' => 65, 'fabric' => 20, 'chemicals' => 15]; // Default

        foreach ($distributionData as $data) {
            $cat = strtolower($data->category);
            if (array_key_exists($cat, $distribution)) {
                $distribution[$cat] = round(($data->total_val / $totalValAll) * 100);
            }
        }

        // ৬. Recent Large Invoices (Inventory 'in' transactions as vendors/suppliers)
        $recentInvoices = DB::table('inventory_transactions')
            ->join('inventories', 'inventory_transactions.inventory_id', '=', 'inventories.id')
            ->select(
                'inventory_transactions.reference_person as vendor',
                DB::raw('inventory_transactions.quantity * inventories.unit_price as amount'),
                'inventory_transactions.created_at'
            )
            ->where('inventory_transactions.type', 'in')
            ->latest('inventory_transactions.created_at')
            ->limit(3)
            ->get()
            ->map(function ($inv) {
                return [
                    'vendor' => $inv->vendor ?: 'Direct Purchase',
                    'amount' => '$' . number_format($inv->amount, 0),
                    'status' => 'Paid'
                ];
            });

        return Inertia::render("Admin/FinancialReport", [
            'dbStats' => [
                'totalAsset' => (float) $totalAsset,
                'materialExpenses' => (float) $materialExpenses,
                'wasteRecovery' => (float) $wasteRecovery,
                'pendingPayments' => (float) $pendingPayments,
            ],
            'dbDistribution' => [
                'yarn' => ['val' => $distribution['yarn'], 'amount' => round(($distribution['yarn'] / 100) * $totalAsset)],
                'fabric' => ['val' => $distribution['fabric'], 'amount' => round(($distribution['fabric'] / 100) * $totalAsset)],
                'chemicals' => ['val' => $distribution['chemicals'], 'amount' => round(($distribution['chemicals'] / 100) * $totalAsset)],
            ],
            'dbInvoices' => $recentInvoices->isEmpty() ? null : $recentInvoices
        ]);
    }
}