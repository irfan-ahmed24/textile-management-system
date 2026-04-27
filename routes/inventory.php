<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Inventory\DashboardController;
use App\Http\Controllers\Inventory\StockInController;
use App\Http\Controllers\Inventory\StockOutController;
use App\Http\Controllers\Inventory\MatarialController;
use App\Http\Controllers\Inventory\LowStockController;
use App\Http\Controllers\Inventory\MaterialRequestController;
use App\Http\Controllers\Inventory\SettingsController;

Route::middleware(['auth'])->prefix('inventory-manager')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('inventory.dashboard');

    Route::get("/materials", [MatarialController::class, 'index'])->name('inventory.materials');

    Route::get("/stock-in", [StockInController::class, 'index'])->name('inventory.stock_in');
    Route::post("/stock-in", [StockInController::class, 'store'])->name('inventory.stockIn.store');
    Route::get("/stock-out", [StockOutController::class, 'index'])->name('inventory.stock_out');
    Route::post('/stock-out/store', [StockOutController::class, 'store'])->name('inventory.stockOut.store');

    Route::get("/low-stock", [LowStockController::class, 'index'])->name('inventory.low_stock');


    Route::get("/material-requests", [MaterialRequestController::class, 'index'])->name('inventory.material_requests');



    Route::get("/settings", [SettingsController::class, 'index'])->name('inventory.settings');
});