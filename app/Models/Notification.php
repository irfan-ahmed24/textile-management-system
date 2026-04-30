<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'message',
        'user_id',
        'is_read',
    ];

    /**
     * যে ইউজারের জন্য নোটিফিকেশন তৈরি হয়েছে তার সাথে রিলেশন
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}