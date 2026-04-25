<?php

namespace App\Http\Controllers\Production;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Stage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RunningOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')
            ->where('status', 'in-production')
            ->latest()
            ->get();
        $stages = Stage::orderBy('id', 'asc')->get();

        return Inertia::render("Production_manager/RunningOrder", [
            'dbOrders' => $orders,
            'baseStages' => $stages
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'current_stage_id' => 'required|exists:stages,id',
            'admin_note' => 'nullable|string|max:500'
        ]);

        $order = Order::findOrFail($id);

        $order->update([
            'current_stage_id' => $request->current_stage_id,
            'admin_note' => $request->admin_note
        ]);

        if ($request->current_stage_id == 6) {
            $order->update(['status' => 'completed']);
        }

        return redirect()->back()->with('success', 'Buyer has been notified with the update!');
    }
}