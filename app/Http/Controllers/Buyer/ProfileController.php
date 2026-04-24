<?php
namespace App\Http\Controllers\Buyer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use inertia\inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return inertia::render('buyer/Profile');
    }
}