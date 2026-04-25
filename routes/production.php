<?php
use App\Http\Controllers\Inventory\MatarialController;
use App\Http\Controllers\Production\SettingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*++++++++++++++++++++++++++++++++++++++++++++ controllers import +++++++++++++++++++++++++*/
use App\Http\Controllers\Production\DashboardController;
use App\Http\Controllers\Production\RunningOrderController;
use App\Http\Controllers\Production\StageController;
use App\Http\Controllers\Production\AllOrderController;
use App\Http\Controllers\Production\OrderRequestController;
use App\Http\Controllers\Production\MaterialRequestController;

Route::middleware(['auth'])->prefix('/production-manager')->group(function () {

    Route::get("/dashboard", [DashboardController::class, 'index'])->name("production.dashboard");

    Route::get("/running-order", [RunningOrderController::class, 'index'])->name("production.running-order");
    Route::post("/running-order/update/{id}", [RunningOrderController::class, 'updateStatus'])->name("production.running-order.update");

    Route::get("/stages", [StageController::class, 'index'])->name("production.stages");


    Route::get("/order-request", [OrderRequestController::class, 'index'])->name("production.order-request");

    // কোটেশন পাঠানোর জন্য
    Route::post("/order-request/send-quote", [OrderRequestController::class, 'sendQuote'])->name("production.order-request.send-quote");
    Route::post("/order-request/{id}/approve", [OrderRequestController::class, 'approveOrder'])->name("production.order-request.approve");


    Route::get("/all-orders", [AllOrderController::class, "index"])->name("production.all-orders");

    Route::get("/material-request", [MaterialRequestController::class, "index"])->name("production.material-request");

    Route::get("/settings", [SettingsController::class, "index"])->name("production.settings");

});