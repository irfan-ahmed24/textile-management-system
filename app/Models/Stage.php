<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stage extends Model
{
    use HasFactory;

    /**
     * যেহেতু আমরা ID ম্যানুয়ালি ইনসার্ট করছি (০, ১, ২...), 
     * তাই অটো-ইনক্রিমেন্ট ফলস করে দেওয়া ভালো।
     */
    public $incrementing = false;

    /**
     * টেবিলের ফিল্ডগুলো যা মাস-অ্যাসাইনমেন্ট করা যাবে।
     */
    protected $fillable = [
        'id',
        'name'
    ];
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'current_stage_id');
    }
}