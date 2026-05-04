<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Notification;
use App\Models\Order;
// use App\Models\Inventory;   // আপনার মডেল অনুযায়ী
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ১. স্ট্যাটাস গ্রিডের জন্য ডেটা
        $stats = [
            'total_revenue' => Order::where('status', 'completed')->sum('total_amount'), // আপনি চাইলে Order::sum('total_price') দিতে পারেন
            'total_users' => User::count(),
            'pending_approvals' => User::where('status', 'pending')->count(),
            'active_production' => Order::where('status', 'in-production')->count(), // Production::where('status', 'running')->count()
        ];

        // ২. রিসেন্ট অ্যাক্টিভিটি (নোটিফিকেশন বা লগ টেবিল থেকে)
        $activities = Notification::latest()
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'user' => $item->user ? $item->user->name : 'System',
                    'action' => $item->message,
                    'time' => $item->created_at->diffForHumans(),
                ];
            });

        // ৩. স্টক ওভারভিউ (ইনভেন্টরি টেবিল থেকে)
        // এটি একটি উদাহরণ, আপনার কলাম নাম অনুযায়ী পরিবর্তন করবেন
        $stocks = [
            ['name' => 'Cotton Yarn', 'level' => 85, 'color' => 'bg-emerald-500'],
            ['name' => 'Chemicals', 'level' => 40, 'color' => 'bg-amber-500'],
            ['name' => 'Grey Fabric', 'level' => 92, 'color' => 'bg-indigo-500'],
        ];

        return Inertia::render("Admin/Dashboard", [
            'dbStats' => $stats,
            'dbActivities' => $activities,
            'dbStocks' => $stocks
        ]);
    }
}