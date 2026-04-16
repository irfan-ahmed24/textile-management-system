<?php

use App\Http\Controllers\Admin\UserManage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get("/dashboard", function () {
        return Inertia::render("Admin/Dashboard");
    })->name("admin.dashboard");

    Route::get('/user-management', [UserManage::class, 'index'])->name('admin.users');

    Route::post('/user-management/store', [UserManage::class, 'store'])->name('admin.users.store');
    Route::delete('/user-management/{id}', [UserManage::class, 'destroy'])->name('admin.users.destroy');
});