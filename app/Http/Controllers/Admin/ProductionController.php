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
        // ১. এক্টিভ এবং কমপ্লিটেড অর্ডারের সংখ্যা (Stats)
        // আপনার টেবিলের স্ট্যাটাস অনুযায়ী ফিল্টার করা হয়েছে
        $activeCount = DB::table('orders')
            ->whereIn('status', ['pending', 'approved', 'in-production'])
            ->count();

        $completedCount = DB::table('orders')
            ->where('status', 'completed')
            ->count();

        // ২. মেইন প্রোডাকশন লিস্ট (Orders table অনুযায়ী)
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
                // stages টেবিল থেকে বর্তমান ধাপের নাম আনা (যদি থাকে)
                // আপনার বর্তমান স্টেজ আইডি অনুযায়ী ধাপের নাম সেট করা
                $stageName = DB::table('stages')->where('id', $order->current_stage_id)->value('name') ?? 'Initial';

                // প্রগ্রেস ক্যালকুলেশন (উদাহরণ: ৫টি স্টেজ থাকলে ১টি শেষ হলে ২০%)
                // অথবা completed হলে সরাসরি ১০০%
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

        // ডাটাবেস খালি থাকলে ডিজাইন ধরে রাখার জন্য ডামি ডাটা (অপশনাল)
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