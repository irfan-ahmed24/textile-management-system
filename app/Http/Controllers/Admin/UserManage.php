<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class UserManage extends Controller
{
    public function index()
    {
        $users = User::latest()->get();

        return Inertia::render('Admin/UserManagement', [
            'users' => $users
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // পাসওয়ার্ড এনক্রিপ্ট করা
            'role' => $request->role,
            'status' => 'Active', // ডিফল্ট স্ট্যাটাস Active রাখা হলো
            'company_name' => $request->company_name,
            'phone' => $request->phone,
            'website' => $request->website,
            'address' => $request->address,
        ]);

        // ৩. মেসেজ সহ আগের পেজে পাঠানো (Inertia standard)
        return Redirect::back()->with('success', 'User created successfully!');
    }
}