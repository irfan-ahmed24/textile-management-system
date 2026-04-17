<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->id();

            // ১. কোন আইটেমের লেনদেন হচ্ছে (Foreign Key)
            $table->foreignId('inventory_id')->constrained('inventories')->onDelete('cascade');

            // ২. ট্রানজেকশন টাইপ (In মানে মালামাল ঢুকেছে, Out মানে বের হয়েছে)
            $table->enum('type', ['in', 'out']);

            // ৩. কতটুকু পরিমাণ (Precision বজায় রাখার জন্য decimal)
            $table->decimal('quantity', 15, 2);

            // ৪. কেন এই ট্রানজেকশন হচ্ছে (যেমন: Purchase, Production, Sale, Damage)
            $table->string('reason');

            // ৫. কার কাছ থেকে এসেছে বা কার কাছে গেছে (Supplier বা Department এর নাম)
            $table->string('reference_person')->nullable();

            // ৬. কে এই এন্ট্রিটি করেছে (Admin/Manager ID)
            $table->foreignId('user_id')->constrained('users');

            // ৭. অতিরিক্ত নোট বা রিমার্কস
            $table->text('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_transactions');
    }
};
