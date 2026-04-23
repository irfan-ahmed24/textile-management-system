<?php
use App\Http\Controllers\Inventory\MatarialController;
use App\Http\Controllers\Production\SettingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*++++++++++++++++++++++++++++++++++++++++++++ controllers inport+++++++++++++++++++++++++*/
use App\Http\Controllers\Production\DashboardController;
use App\Http\Controllers\Production\RunningOrderController;
use App\Http\Controllers\Production\StageController;
use App\Http\Controllers\Production\OrderRequestController;
use App\Http\Controllers\Production\MaterialRequestController;


Route::middleware(['auth'])->prefix('/production-manager')->group(function () {

    Route::get("/dashboard", [DashboardController::class, 'index'])->name("production.dashboard");

    Route::get("/running-order", [RunningOrderController::class, 'index'])->name("production.running-order");

    Route::get("/stages", [StageController::class, 'index'])->name("production.stages");


    Route::get("/order-request", [OrderRequestController::class, 'index'])->name("production.order-request");


    Route::get("/material-request", [MaterialRequestController::class, "index"])->name("production.material-request");


    Route::get("/settings", [SettingsController::class, "index"])->name("production.settings");


});


