<?php

use App\Http\Controllers\Admin\UserManage;
use App\Http\Controllers\Admin\UserRequestController;
use App\Http\Controllers\Admin\InventoryReportController;
use App\Http\Controllers\Admin\OrderRequestController;
use App\Http\Controllers\Admin\ProductionController;
use App\Http\Controllers\Admin\FinancialController;
use App\Http\Controllers\Admin\SettingsController;



use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get("/dashboard", function () {
        return Inertia::render("Admin/Dashboard");
    })->name("admin.dashboard");
    Route::get('/user-management', [UserManage::class, 'index'])->name('admin.users');
    Route::post('/user-management/store', [UserManage::class, 'store'])->name('admin.users.store');
    Route::delete('/user-management/{id}', [UserManage::class, 'destroy'])->name('admin.users.destroy');
    Route::get('/user-requests', [UserRequestController::class, 'index'])->name('admin.user-requests');



    // Route::get('/user-management/{id}/edit', [UserManage::class, 'edit'])->name('admin.users.edit');
    Route::get("Inventory_Report", [InventoryReportController::class, "index"])->name("admin.inventory.report");

    Route::get("/order-requests", [OrderRequestController::class, "index"])->name("admin.order.requests");

    Route::get("/production", [ProductionController::class, "index"])->name("admin.production.overview");


    Route::get("/reports", [FinancialController::class, "index"])->name("admin.FinancialReports");
    Route::get("/settings", [SettingsController::class, "index"])->name("admin.settings");

});