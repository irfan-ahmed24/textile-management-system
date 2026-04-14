<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/production_manager/dashboard", function () {
    return Inertia::render("Production_manager/Dashboard");
})->name("production.index");