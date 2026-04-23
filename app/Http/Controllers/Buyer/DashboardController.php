<?php
namespace App\Http\Controllers\Buyer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia("buyer/Dashboard");
    }
}