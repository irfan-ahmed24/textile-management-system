<?php

namespace App\Http\Controllers\Production;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllOrderController extends Controller
{
    /**
     * সকল অর্ডারের বিস্তারিত লিস্ট দেখানো
     */
    public function index()
    {
        $orders = Order::with(['user', 'stage', 'payment'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_no' => str_pad($order->id, 2, '0', STR_PAD_LEFT),
                    'product_name' => $order->product_name,
                    'fabric_type' => $order->fabric_type,
                    'total_quantity' => $order->total_quantity,
                    'total_amount' => number_format($order->total_amount, 2),
                    'priority' => $order->priority_level,
                    'target_delivery' => $order->target_delivery ? $order->target_delivery->format('d M, Y') : 'N/A',

                    // বায়ার ইনফো (User Relation)
                    'buyer_name' => $order->user->name ?? 'Unknown Buyer',
                    'buyer_email' => $order->user->email ?? 'N/A',
                    'current_stage' => $order->stage->name ?? 'Pending Review',
                    'stage_id' => $order->current_stage_id,


                    'payment_status' => $order->payment_status, // Paid/Unpaid
                    'transaction_id' => $order->payment->transaction_id ?? 'N/A',


                    'order_status' => ucfirst($order->status), // Pending, In-Production, Completed
                    'admin_note' => $order->admin_note,
                    'last_update' => $order->updated_at->diffForHumans(),
                    'created_at' => $order->created_at->format('d M, Y'),
                ];
            });

        return Inertia::render("Production_manager/AllOrder", [
            'allOrders' => $orders
        ]);
    }
}