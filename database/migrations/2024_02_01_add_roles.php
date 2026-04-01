<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Đổi từ 'user/admin' sang 3 roles thực tế
            $table->string('role')
                  ->default('guest')
                  ->change();
            // guest       = Khách hàng
            // receptionist = Lễ tân
            // manager     = Quản lý
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('guest')->change();
        });
    }
};