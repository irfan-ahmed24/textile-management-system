<?php
namespace App\Http\Controllers\Buyer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        // এখানে ইনভয়েস সম্পর্কিত লজিক থাকবে
        return inertia::render('buyer/Invoice');
    }
}