<?php
namespace App\Http\Controllers\Buyer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TrackOrderController extends Controller
{
    public function index()
    {
        return inertia('buyer/TrackOrder');
    }
}