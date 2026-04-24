<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ProfileController extends Controller
{
    /**
     * প্রোফাইল পেজ দেখানো এবং ডাটা পাঠানো
     */
    public function index()
    {
        // বর্তমানে লগইন করা ইউজারের সব তথ্য ডাটাবেস থেকে নেওয়া হচ্ছে
        $user = Auth::user();

        return Inertia::render('buyer/Profile', [
            'mustVerifyEmail' => $user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
            'userData' => $user, // এই userData প্রপস হিসেবে React ফাইলে যাবে
        ]);
    }

    /**
     * প্রোফাইল ডাটা আপডেট করা
     */
    public function update(Request $request)
    {
        $user = $request->user();

        // ভ্যালিডেশন
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
        ]);

        // ডাটাবেসে আপডেট
        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'company' => $request->company,
            'address' => $request->address,
        ]);

        return Redirect::route('buyer.profile')->with('success', 'Profile updated successfully!');
    }
}