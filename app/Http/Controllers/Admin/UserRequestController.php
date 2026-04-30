<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRequestController extends Controller
{
    public function index()
    {
        $requests = User::where('role', 'buyer')
            ->where('status', 'pending')
            ->latest()
            ->get();

        return Inertia::render("Admin/UserRequest", [
            'buyerRequests' => $requests
        ]);
    }

    public function approve($id)
    {
        $user = User::findOrFail($id);
        $user->update([
            'status' => 'active'
        ]);

        return redirect()->back()->with('success', 'Buyer approved successfully!');
    }
    public function reject($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('error', 'Request rejected.');
    }
}