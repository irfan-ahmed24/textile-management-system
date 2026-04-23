<?php
namespace App\Http\Controllers\Production;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderRequestController extends Controller
{
    public function index()
    {
        return inertia("Production_manager/OrderRequest");
    }
}