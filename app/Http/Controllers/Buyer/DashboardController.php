<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // ১. মোট অর্ডারের সংখ্যা
        $totalOrders = Order::where('user_id', $userId)->count();

        // ২. বর্তমানে উৎপাদনে আছে এমন অর্ডার (In Production)
        $runningOrdersCount = Order::where('user_id', $userId)
            ->where('status', 'in-production')
            ->count();

        // ৩. পেন্ডিং রিকোয়েস্ট (যা এখনো অ্যাপ্রুভ হয়নি)
        $pendingOrdersCount = Order::where('user_id', $userId)
            ->where('status', 'pending')
            ->count();

        // ৪. সফলভাবে সম্পন্ন হওয়া অর্ডার
        $completedOrdersCount = Order::where('user_id', $userId)
            ->where('status', 'completed')
            ->count();

        // ৫. রিসেন্ট ৫টি অর্ডার (অ্যাক্টিভিটি লগের জন্য)
        $recentOrders = Order::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render("buyer/Dashboard", [
            'stats' => [
                'total' => $totalOrders,
                'running' => $runningOrdersCount,
                'pending' => $pendingOrdersCount,
                'completed' => $completedOrdersCount,
            ],
            'recentOrders' => $recentOrders
        ]);
    }
}