<?php
// database/migrations/2024_02_04_create_services_table.php

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // Nước suối, Giặt ủi, Massage, Thuê xe máy...
            $table->unsignedBigInteger('price');
            // Giá bán hiện tại
            $table->string('unit')->default('lượt');
            // chai, kg, lượt, giờ, bộ...
            $table->string('category')->nullable();
            // Nhóm: "Ẩm thực", "Giặt ủi", "Di chuyển", "Spa"
            $table->boolean('is_active')->default(true);
            // Tắt dịch vụ không xóa
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};