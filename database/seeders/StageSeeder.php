<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StageSeeder extends Seeder
{
    public function run(): void
    {
        $baseStages = [
            ['id' => 0, 'name' => "Order Pending"],
            ['id' => 1, 'name' => "Yarn Processing"],
            ['id' => 2, 'name' => "Knitting / Dyeing"],
            ['id' => 3, 'name' => "Cutting & Stitching"],
            ['id' => 4, 'name' => "Quality Check"],
            ['id' => 5, 'name' => "Ready to Ship"],
            ["id" => 6, "name" => "completed"],
        ];

        foreach ($baseStages as $stage) {
            DB::table('stages')->updateOrInsert(
                ['id' => $stage['id']],
                ['name' => $stage['name'], 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}