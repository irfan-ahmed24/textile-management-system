<?php

Route::get("/buyer/dashboard", function () {
    return Inertia\Inertia::render("buyer/Dashboard");
})->name("buyer.dashboard");