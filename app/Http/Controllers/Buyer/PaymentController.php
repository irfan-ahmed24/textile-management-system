<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function index()
    {
        return Inertia::render('buyer/Payment');
    }

    public function processPayment(Request $request)
    {
        // ১. ভ্যালিডেশন
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'amount' => 'required|numeric|min:1',
            'payment_type' => 'required|in:stripe,manual',
            // ম্যানুয়াল পেমেন্ট হলে transaction_id বাধ্যতামূলক
            'transaction_id' => 'required_if:payment_type,manual|nullable|string|max:255',
        ]);

        // ২. ইউজারের নিজস্ব অর্ডারটি খুঁজে বের করা
        $order = Order::where('id', $request->order_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        try {
            DB::transaction(function () use ($request, $order) {

                // পেমেন্ট মেথড অনুযায়ী ট্রানজেকশন আইডি জেনারেট করা
                $finalTransactionId = ($request->payment_type === 'stripe')
                    ? "STRIPE_" . strtoupper(uniqid())
                    : $request->transaction_id;

                // ৩. পেমেন্ট টেবিলে রেকর্ড তৈরি (এটি সবসময় তৈরি হবে)
                Payment::create([
                    'order_id' => $order->id,
                    'user_id' => Auth::id(),
                    'amount' => $request->amount,
                    'transaction_id' => $finalTransactionId,
                    'payment_method' => $request->payment_type,
                    'status' => ($request->payment_type === 'stripe') ? 'completed' : 'pending',
                ]);

                // ৪. অর্ডার টেবিল আপডেট
                if ($request->payment_type === 'stripe') {
                    // অনলাইন পেমেন্ট হলে সরাসরি পেইড এবং প্রোডাকশনে যাবে
                    $order->update([
                        'payment_status' => 'paid',
                        'status' => 'in-production',
                        'transaction_id' => $finalTransactionId, // রেফারেন্সের জন্য
                    ]);
                } else {
                    // ম্যানুয়াল পেমেন্ট হলে শুধুমাত্র transaction_id জমা থাকবে, স্ট্যাটাস unpaid থাকবে
                    $order->update([
                        'payment_status' => 'unpaid',
                        'transaction_id' => $finalTransactionId, // এটিই প্রোডাকশন ম্যানেজার দেখবে
                    ]);
                }
            });

            // ৫. সফল মেসেজ সেট করা
            $message = ($request->payment_type === 'stripe')
                ? 'Stripe Payment Successful! Your order is now in production.'
                : 'Manual Payment Submitted. Please wait for manager verification.';

            return redirect()->route('buyer.orders.index')->with('success', $message);

        } catch (\Exception $e) {
            // কোনো ভুল হলে ক্যাচ ব্লকে আসবে
            return back()->withErrors(['error' => 'Payment processing failed: ' . $e->getMessage()]);
        }
    }
}