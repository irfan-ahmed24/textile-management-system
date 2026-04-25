<?php

namespace App\Http\Controllers\Production;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ১. স্ট্যাটাস ক্যালকুলেশন
        $stats = [
            'running_orders' => Order::where('status', 'in-production')->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'completed_orders' => Order::where('status', 'completed')->count(),
            'total_quantity' => Order::where('status', 'in-production')->sum('total_quantity'),
        ];

        // ২. সাম্প্রতিক প্রোডাকশন লাইন (সর্বশেষ ৫টি চলমান অর্ডার)
        $liveProduction = Order::with(['user', 'stage'])
            ->where('status', 'in-production')
            ->latest('updated_at')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => '#ORD-' . $order->id,
                    'name' => $order->product_name,
                    'buyer' => $order->user->name ?? 'Unknown',
                    'stage' => $order->stage->name ?? 'Processing',
                    'progress' => $order->current_stage_id ? round(($order->current_stage_id / 6) * 100) : 0,
                    'priority' => $order->priority_level ?? 'Normal',
                ];
            });

        // ৩. বায়ার সামারি (কোন বায়ারের কয়টি অর্ডার প্রোডাকশনে আছে)
        $buyerSummary = Order::with('user')
            ->where('status', 'in-production')
            ->selectRaw('user_id, count(*) as count')
            ->groupBy('user_id')
            ->limit(4)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->user->name ?? 'Unknown',
                    'orders' => $item->count,
                ];
            });

        return Inertia::render("Production_manager/Dashboard", [
            'stats' => $stats,
            'liveProduction' => $liveProduction,
            'buyerSummary' => $buyerSummary
        ]);
    }
}