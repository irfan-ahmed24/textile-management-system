<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TrackOrderController extends Controller
{
    public function index()
    {
        // লগইন করা বায়ারের সব অর্ডার নিয়ে আসা (যাতে ফ্রন্টএন্ডে ইনস্ট্যান্ট সার্চ কাজ করে)
        $orders = Order::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('buyer/TrackOrder', [
            'orders' => $orders // এখানে orders (বহুবচন) হিসেবে পাঠানো হলো
        ]);
    }
}