<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Inventory\StockInController;
use App\Http\Controllers\Inventory\StockOutController;
use App\Http\Controllers\Inventory\MatarialController;

Route::middleware(['auth'])->prefix('inventory-manager')->group(function () {

    Route::get('/dashboard', function () {
        return inertia('Inventory_manager/Dashboard');
    })->name('inventory.dashboard');
    Route::get("/materials", [MatarialController::class, 'index'])->name('inventory.materials');
    Route::get("/stock-in", [StockInController::class, 'index'])->name('inventory.stock_in');
    Route::post("/stock-in", [StockInController::class, 'store'])->name('inventory.stockIn.store');
    Route::get("/stock-out", [StockOutController::class, 'index'])->name('inventory.stock_out');
    Route::post('/stock-out/store', [StockOutController::class, 'store'])->name('inventory.stockOut.store');
    // Route::get("/alerts", [InventoryController::class, 'alerts'])->name('inventory.alerts');
    // Route::get("/waste", [InventoryController::class, 'waste'])->name('inventory.waste');
});