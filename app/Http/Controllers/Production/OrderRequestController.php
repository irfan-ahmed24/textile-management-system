<?php

namespace App\Http\Controllers\Production;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class OrderRequestController extends Controller
{
    /**
     * ইনকামিং রিকোয়েস্টগুলো দেখানো (পেমেন্ট টেবিলসহ)
     */
    public function index()
    {
        // 'user' এবং 'payment' রিলেশনসহ অর্ডারগুলো আনা হচ্ছে
        // যাতে অর্ডারের সাথে বায়ারের পাঠানো ট্রানজেকশন আইডি পাওয়া যায়
        $orders = Order::with([
            'user',
            'payment' => function ($query) {
                $query->where('status', 'pending')->latest();
            }
        ])
            ->whereIn('status', ['pending', 'awaiting_payment'])
            ->latest()
            ->get();

        return Inertia::render("Production_manager/OrderRequest", [
            'runningOrders' => $orders
        ]);
    }

    /**
     * বায়ারকে প্রাইস কোটেশন পাঠানো
     */
    public function sendQuote(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'total_amount' => 'required|numeric|min:1',
        ]);

        $order = Order::findOrFail($request->order_id);

        $order->update([
            'total_amount' => $request->total_amount,
            'status' => 'awaiting_payment',
        ]);

        return redirect()->back()->with('success', 'Quote sent successfully!');
    }

    /**
     * প্রোডাকশন এপ্রুভ করা (ম্যানুয়াল পেমেন্ট ভেরিফাইসহ)
     */
    public function approveOrder($id)
    {
        try {
            return DB::transaction(function () use ($id) {
                $order = Order::findOrFail($id);

                // ১. অর্ডারের পেমেন্ট স্ট্যাটাস এবং প্রোডাকশন স্ট্যাটাস আপডেট
                $order->update([
                    'payment_status' => 'paid',
                    'status' => 'in-production',
                    'current_stage_id' => 1,
                ]);

                // ২. পেমেন্ট টেবিলে ওই অর্ডারের কোনো পেন্ডিং পেমেন্ট থাকলে তা 'completed' করা
                Payment::where('order_id', $order->id)
                    ->where('status', 'pending')
                    ->update(['status' => 'completed']);

                return redirect()->back()->with('success', 'Order Verified & Production Started!');
            });
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }
}