<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            // কোন অর্ডারের পেমেন্ট
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            // কোন ইউজার পেমেন্ট করেছে
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->decimal('amount', 12, 2); // পেমেন্টের পরিমাণ
            $table->string('currency')->default('USD');
            $table->string('transaction_id')->unique();
            $table->string('payment_method')->default('card'); // card, paypal etc.

            // পেমেন্টের অবস্থা (succeeded, pending, failed)
            $table->string('status')->default('succeeded');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};