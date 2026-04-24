<?php

use Illuminate\Support\Facades\Route;

/* Controller Imports */
use App\Http\Controllers\Buyer\DashboardController;
use App\Http\Controllers\Buyer\OrderController;
use App\Http\Controllers\Buyer\TrackOrderController;
use App\Http\Controllers\Buyer\PaymentController;
use App\Http\Controllers\Buyer\InvoiceController;
use App\Http\Controllers\Buyer\ProfileController;


Route::middleware(['auth'])->prefix('/buyer')->group(function () {
    // ড্যাশবোর্ড রুট
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('buyer.dashboard');

    // অর্ডার রুটস
    Route::get('/orders', [OrderController::class, 'index'])->name('buyer.orders');
    Route::post('/orders', [OrderController::class, 'store'])->name('buyer.orders.store');
    Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->name('buyer.orders.destroy');

    // অর্ডার ট্র্যাকিং রুট
    Route::get('/track-order', [TrackOrderController::class, 'index'])->name('buyer.track-order');

    Route::get('/payments', [PaymentController::class, 'index'])->name('buyer.payment');
    Route::post('/payment/process', [PaymentController::class, 'processPayment'])->name('buyer.payment.process');

    Route::get('/invoices', [InvoiceController::class, 'index'])->name('buyer.invoices');

    Route::get('/profile', [ProfileController::class, 'index'])->name('buyer.profile');
});