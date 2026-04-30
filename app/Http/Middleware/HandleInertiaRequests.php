<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            // ১. ইউজার অথেন্টিকেশন ডাটা
            'auth' => [
                'user' => $request->user(),
            ],

            // ২. নোটিফিকেশন লজিক (শুধুমাত্র অ্যাডমিন আনরিড নোটিফিকেশন দেখতে পাবে)
            'notifications' => function () use ($request) {
                if (!$request->user() || !in_array($request->user()->role, ['Admin', 'admin'])) {
                    return [];
                }
                return Notification::where('is_read', false)
                    ->latest()
                    ->get();
            },

            // ৩. ফ্ল্যাশ মেসেজ (রেজিস্ট্রেশন বা অন্য কাজের পর টোস্ট দেখানোর জন্য)
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ];
    }
}