<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;
use Carbon\Carbon;

class OrderRequestController extends Controller
{
    public function index()
    {
        $dbRequests = Order::with('user')
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'item' => $order->product_name,
                    'qty' => number_format($order->total_quantity) . " Pcs",
                    'est_price' => "$" . number_format($order->total_amount, 2),
                    'requested_by' => $order->user->name ?? 'Unknown',
                    'date' => Carbon::parse($order->created_at)->format('d M, Y'),
                    'priority' => ucfirst($order->priority_level), // যেমন: high, medium
                    'status' => ucfirst($order->status), // যেমন: pending, approved
                ];
            });
        $totalPendingCost = Order::where('status', 'pending')->sum('total_amount');
        $requestsToday = Order::whereDate('created_at', Carbon::today())->count();

        return Inertia::render('Admin/OrderRequest', [
            'dbRequests' => $dbRequests,
            'summary' => [
                'pending_cost' => "$" . number_format($totalPendingCost, 2),
                'today_count' => str_pad($requestsToday, 2, '0', STR_PAD_LEFT)
            ]
        ]);
    }
}