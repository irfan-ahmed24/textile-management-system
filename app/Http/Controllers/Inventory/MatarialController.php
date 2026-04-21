<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatarialController extends Controller
{
    public function index(Request $request)
    {
        // ডাটাবেস থেকে আইটেমগুলো নিয়ে আসা
        $materials = Inventory::all()->map(function ($item) {
            // স্টকের অবস্থার উপর ভিত্তি করে স্ট্যাটাস নির্ধারণ
            $status = "In Stock";
            if ($item->quantity <= 0) {
                $status = "Out of Stock";
            } elseif ($item->quantity <= $item->min_stock_level) {
                $status = "Low Stock";
            }

            return [
                'id' => $item->id,
                'name' => $item->item_name,
                'code' => $item->item_code,
                'category' => $item->category,
                'stock' => (float) $item->quantity,
                'unit' => $item->unit,
                'price' => (float) $item->unit_price,
                'location' => $item->warehouse_location ?? 'N/A',
                'status' => $status,
            ];
        });

        return Inertia::render('Inventory_manager/Materials', [
            'dbMaterials' => $materials
        ]);
    }
}