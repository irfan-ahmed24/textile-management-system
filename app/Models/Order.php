<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_name',
        'fabric_type',
        'total_quantity',
        'total_amount',
        'priority_level',
        'target_delivery',
        'size_breakdown',
        'special_instructions',
        'admin_note',
        'status',
        'payment_status',
        'current_stage_id'
    ];

    protected $casts = [
        'size_breakdown' => 'array',
        'target_delivery' => 'date',
        'total_amount' => 'decimal:2',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function stage(): BelongsTo
    {
        return $this->belongsTo(Stage::class, 'current_stage_id');
    }
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class, 'order_id')->latestOfMany();
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'order_id');
    }
}