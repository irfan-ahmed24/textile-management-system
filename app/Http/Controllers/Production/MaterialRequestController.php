<?php
namespace App\Http\Controllers\Production;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MaterialRequestController extends Controller
{
    public function index()
    {
        return inertia("Production_manager/MaterialRequest");
    }
}