<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryController;

Route::middleware(['auth'])->prefix('inventory-manager')->group(function () {

    Route::get('/dashboard', function () {
        return inertia('Inventory_manager/Dashboard');
    })->name('inventory.dashboard');

});