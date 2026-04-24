<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('product_name');
            $table->string('fabric_type');
            $table->integer('total_quantity');
            $table->string('priority_level');
            $table->date('target_delivery');

            // Size Breakdown (JSON হিসেবে স্টোর করা সবচেয়ে সহজ এবং বেস্ট)
            // এটি দেখতে এমন হবে: {"S": 100, "M": 200, "L": 500, "XL": 200}
            $table->json('size_breakdown')->nullable();

            $table->text('special_instructions')->nullable();

            $table->string('status')->default('pending'); // pending, approved, in-production, shipped, completed
            $table->integer('current_stage_id')->default(1); // ১ মানে শুরুর স্টেজ (Yarn/Knitting)
            $table->decimal('total_amount', 12, 2)->default(0.00); // পেমেন্ট এর জন্য

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};