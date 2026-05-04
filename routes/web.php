<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AuthController;

Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        if ($user->role === 'Admin') {
            return redirect()->intended('/admin/dashboard');
        } elseif ($user->role === 'Inventory Manager') {
            return redirect()->intended('/inventory-manager/dashboard');
        } elseif ($user->role === 'Production Manager') {
            return redirect()->intended('/production/dashboard');
        } else {
            return redirect()->intended('/buyer/dashboard');
        }
    }
    return Inertia::render('Welcome');
})->name('home');



Route::get('/register', [AuthController::class, 'showRegister'])->name('register.show');
Route::post('/register', [AuthController::class, 'register'])->name('register.perform');


require __DIR__ . '/auth.php';
require __DIR__ . '/buyer.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/inventory.php';
require __DIR__ . '/production.php';
