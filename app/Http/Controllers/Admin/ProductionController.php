<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class ProductionController extends Controller
{
    public function index()
    {
        $activeCount = DB::table('orders')
            ->whereIn('status', ['pending', 'approved', 'in-production'])
            ->count();

        $completedCount = DB::table('orders')
            ->where('status', 'completed')
            ->count();
        $productionOrders = DB::table('orders')
            ->select(
                'id',
                'product_name',
                'total_quantity',
                'status',
                'target_delivery',
                'current_stage_id',
                'priority_level'
            )
            ->latest()
            ->get()
            ->map(function ($order) {
                $stageName = DB::table('stages')->where('id', $order->current_stage_id)->value('name') ?? 'Initial';
                $progressValue = $order->status === 'completed' ? 100 : ($order->current_stage_id * 10);

                return [
                    'id' => "ORD-" . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                    'product' => $order->product_name,
                    'total_qty' => number_format($order->total_quantity) . " Pcs",
                    'stage' => $stageName,
                    'progress' => $progressValue > 100 ? 100 : $progressValue,
                    'status' => ucfirst($order->status), // প্রথম অক্ষর বড় হাতের করার জন্য
                    'deadline' => Carbon::parse($order->target_delivery)->format('d M, Y'),
                    'priority' => $order->priority_level,
                ];
            });
        if ($productionOrders->isEmpty()) {
            $productionOrders = [
                [
                    'id' => 'ORD-0001',
                    'product' => 'Sample Product',
                    'total_qty' => '0 Pcs',
                    'stage' => 'No Data',
                    'progress' => 0,
                    'status' => 'Pending',
                    'deadline' => now()->format('d M, Y')
                ]
            ];
        }

        return Inertia::render("Admin/ProductionOverview", [
            'dbOrders' => $productionOrders,
            'stats' => [
                'active' => $activeCount ?: 0,
                'completed' => $completedCount ?: 0
            ]
        ]);
    }
}