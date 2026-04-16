<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StockInController extends Controller
{
    public function index()
    {
        return inertia('Inventory_manager/Stock_In');
    }
}
