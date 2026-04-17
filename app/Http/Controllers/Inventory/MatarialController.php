<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MatarialController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Inventory_manager/Materials');
    }
}
