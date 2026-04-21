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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();


            $table->string('item_name');
            $table->string('item_code')->unique();
            $table->string('category');


            $table->decimal('quantity', 15, 2)->default(0);
            $table->string('unit')->default('KG'); // KG, Yard, PCS, etc.
            $table->decimal('min_stock_level', 10, 2)->default(10);

            $table->decimal('unit_price', 15, 2)->nullable();
            $table->string('warehouse_location')->nullable();

            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
