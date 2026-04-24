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

    /**
     * যে কলামগুলো মাস-অ্যাসাইনমেন্ট করা যাবে।
     */
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

    /**
     * কাস্টিং (Casts): ডাটাবেসের ডাটাকে পিএইচপি অবজেক্টে রূপান্তর।
     */
    protected $casts = [
        'size_breakdown' => 'array',
        'target_delivery' => 'date',
        'total_amount' => 'decimal:2',
    ];

    /**
     * রিলেশনশিপ: এই অর্ডারটি কোন ইউজারের (বায়ারের)।
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * রিলেশনশিপ: একটি অর্ডারের লেটেস্ট পেমেন্ট তথ্য পাওয়ার জন্য।
     * এটি প্রোডাকশন ম্যানেজারের প্যানেলে transaction_id দেখাতে সাহায্য করবে।
     */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class, 'order_id')->latestOfMany();
    }

    /**
     * রিলেশনশিপ: একটি অর্ডারের বিপরীতে একাধিক পেমেন্ট হিস্ট্রি থাকতে পারে।
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'order_id');
    }
}