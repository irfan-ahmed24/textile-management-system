<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = [
        'item_name',
        'item_code',
        'category',
        'quantity',
        'unit',
        'min_stock_level',
        'unit_price',
        'warehouse_location',
        'is_active',
        'description',
    ];
    protected $casts = [
        'quantity' => 'decimal:2',
        'min_stock_level' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * রিলেশনশিপ: একটি ইনভেন্টরি আইটেমের অনেকগুলো ট্রানজেকশন বা লেনদেন থাকতে পারে।
     */
    public function transactions()
    {
        return $this::hasMany(InventoryTransaction::class);
    }

    /**
     * হেল্পার মেথড: স্টক কি কম আছে কি না তা চেক করা।
     */
    public function isLowStock()
    {
        return $this->quantity <= $this->min_stock_level;
    }
}