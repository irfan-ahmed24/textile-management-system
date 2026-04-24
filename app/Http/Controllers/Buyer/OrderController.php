<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * বায়ারের সব অর্ডারের লিস্ট দেখানো
     */
    public function index()
    {
        // বর্তমানে লগইন করা বায়ারের সব অর্ডার লেটেস্ট হিসেবে নিয়ে আসা
        // এখানে পেমেন্ট রিলেটেড নতুন কলামগুলো অটোমেটিক আসবে
        $orders = Order::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render("buyer/MyOrder", [
            'runningOrders' => $orders
        ]);
    }

    /**
     * নতুন অর্ডার ডাটাবেসে সেভ করা
     */
    public function store(Request $request)
    {
        // ডাটা ভ্যালিডেশন
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'fabric_type' => 'required|string',
            'total_quantity' => 'required|integer|min:1',
            'priority_level' => 'required|string',
            'target_delivery' => 'required|date|after:today',
            'size_breakdown' => 'nullable|array',
            'special_instructions' => 'nullable|string',
        ]);

        // ডাটাবেসে স্টোর করা
        Order::create([
            'user_id' => Auth::id(),
            'product_name' => $validated['product_name'],
            'fabric_type' => $validated['fabric_type'],
            'total_quantity' => $validated['total_quantity'],
            'priority_level' => $validated['priority_level'],
            'target_delivery' => $validated['target_delivery'],
            'size_breakdown' => $validated['size_breakdown'],
            'special_instructions' => $validated['special_instructions'],
            'status' => 'pending',
            'payment_status' => 'unpaid', // নতুন অর্ডারের জন্য ডিফল্ট unpaid
            'total_amount' => 0.00,        // প্রাথমিক অবস্থায় ০
            'current_stage_id' => 0,       // আপনার রিকোয়েস্ট অনুযায়ী শুরুতে ০ (Pending)
        ]);

        return redirect()->back()->with('success', 'Order Request Submitted Successfully!');
    }

    /**
     * অর্ডার বাতিল করা (Delete/Cancel)
     */
    public function destroy($id)
    {
        $order = Order::where('id', $id)
            ->where('user_id', Auth::id())
            ->where('payment_status', 'unpaid') // শুধু আনপেইড অর্ডার ডিলিট করা যাবে
            ->firstOrFail();

        $order->delete();

        return redirect()->back()->with('success', 'Order Cancelled Successfully!');
    }
}