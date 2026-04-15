<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

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

            if ($user->role === 'Admin') {
                return redirect()->intended('/admin/dashboard');
            } elseif ($user->role === 'Inventory Manager') {
                return redirect()->intended('/inventory/dashboard');
            } elseif ($user->role === 'Production Manager') {
                return redirect()->intended('/production/dashboard');
            } else {
                return redirect()->intended('/buyer/dashboard');
            }
        }
        throw ValidationException::withMessages([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * লগআউট করার জন্য
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}