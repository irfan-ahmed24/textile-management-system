<?php

namespace App\Http\Controllers\Production;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Stage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StageController extends Controller
{
    public function index()
    {
        // 'where' কন্ডিশন সরিয়ে দেওয়া হলো যাতে সব স্ট্যাটাসের অর্ডার আসে
        $orders = Order::select('id', 'product_name', 'current_stage_id', 'status', 'updated_at')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => (string) $order->id,
                    'product' => $order->product_name,
                    'currentStageId' => $order->current_stage_id,
                    'status' => $order->status, // স্ট্যাটাসটিও পাঠানো হলো রেফারেন্সের জন্য
                    'lastUpdate' => $order->updated_at->diffForHumans(),
                ];
            });

        // সব স্টেজ আনা হচ্ছে
        $stages = Stage::orderBy('id', 'asc')->get();

        return Inertia::render("Production_manager/ProductionStages", [
            'dbOrders' => $orders,
            'dbStages' => $stages
        ]);
    }
}