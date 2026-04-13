<?php

use Inertia\Inertia;

Route::get('/inventory-manager/dashboard', function () {
    return Inertia::render('Inventory_manager/Dashboard');
})->name('inventory.dashboard');