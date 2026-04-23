<?php

use Illuminate\Support\Facades\Route;

/*controller import */
use App\Http\Controllers\Buyer\DashboardController;
use App\Http\Controllers\Buyer\OrderController;
use \App\Http\Controllers\Buyer\TrackOrderController;



Route::middleware(['auth'])->prefix('/buyer')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('buyer.dashboard');
    Route::get('/orders', [OrderController::class, 'index'])->name('buyer.orders');

    Route::get('/track-order', [TrackOrderController::class, 'index'])->name('buyer.track-order');

});