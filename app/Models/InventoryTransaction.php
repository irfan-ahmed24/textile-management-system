<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_id',
        'type',
        'quantity',
        'reason',
        'reference_person',
        'user_id',
        'note',
    ];

    /**
     * ইনভেন্টরি আইটেমের সাথে রিলেশন (Inverse)
     * প্রতিটি ট্রানজেকশন একটি নির্দিষ্ট ইনভেন্টরি আইটেমের অধীনে থাকে।
     */
    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    /**
     * ইউজারের সাথে রিলেশন
     * কোন ইউজার এই এন্ট্রিটি করেছে তা জানার জন্য।
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}