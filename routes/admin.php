<?php

Route::get("/admin/dashboard", function () {
    return Inertia\Inertia::render("Admin/Dashboard");
})->name("admin.dashboard");