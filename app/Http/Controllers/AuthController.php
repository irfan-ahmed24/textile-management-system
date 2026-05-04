<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Notification;
use Illuminate\Validation\Rules;


class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/Login');
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            $user = Auth::user();

            if ($user->status !== 'active') {
                Auth::logout();
                return Redirect::back()->withErrors(['email' => 'Your account is not active. Please contact the administrator.']);
            } else {
                if ($user->role === 'Admin' || $user->role === 'admin') {
                    return redirect()->intended('/admin/dashboard');
                } elseif ($user->role === 'Inventory Manager') {
                    return redirect()->intended('/inventory-manager/dashboard');
                } elseif ($user->role === 'Production Manager') {
                    return redirect()->intended('/production-manager/dashboard');
                } else {
                    return redirect()->intended('/buyer/dashboard');
                }
            }

        }
        throw ValidationException::withMessages([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function showRegister()
    {
        return Inertia::render('auth/Registration');
    }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'company_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'company_name' => $request->company_name,
            'phone' => $request->phone,
            'role' => 'buyer',
            'status' => 'pending',
        ]);

        Notification::create([
            'type' => 'buyer_request',
            'message' => "New Buyer Registration Request from: {$user->name}",
            'user_id' => $user->id,
            'is_read' => false,
        ]);
        return redirect()->route('home')->with('success', 'Your request has been sent! Please wait for admin approval.');
    }
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}