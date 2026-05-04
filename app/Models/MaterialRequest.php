<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialRequest extends Model
{
    protected $fillable = [
        'user_id',
        'inventory_id',
        'item_name',
        'item_code',
        'quantity',
        'unit',
        'reason',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}
