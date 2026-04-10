<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('buyer')->after('password');
            $table->string('status')->default('pending')->after('role');
            $table->string('company_name')->nullable()->after('status');
            $table->string('phone')->nullable()->after('company_name');
            $table->string('website')->nullable()->after('phone');
            $table->text('address')->nullable()->after('website');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'status', 'company_name', 'phone', 'website', 'address']);
        });
    }
};
