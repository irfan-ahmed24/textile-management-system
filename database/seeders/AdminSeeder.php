<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('irfan123'),
            'role' => 'admin',
            'status' => 'active',
            'company_name' => 'SoftSasi',
            'phone' => '01700000000',
            'website' => 'https://softsasi.com',
            'address' => 'Narsingdi, Bangladesh',
        ]);
    }
}