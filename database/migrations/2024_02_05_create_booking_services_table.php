<?php
// database/migrations/2024_02_05_create_booking_services_table.php

return new class extends Migration {
    public function up(): void
    {
        Schema::create('booking_services', function (Blueprint $table) {
            $table->id();

            $table->foreignId('booking_id')
                  ->constrained()->cascadeOnDelete();

            $table->foreignId('service_id')
                  ->constrained()->cascadeOnDelete();

            $table->unsignedInteger('quantity')->default(1);

            $table->unsignedBigInteger('price_at_time');
            // GIÁ LÚC GỌI — quan trọng!
            // Nếu sau này khách sạn tăng giá dịch vụ
            // bill cũ vẫn giữ nguyên giá cũ

            $table->text('note')->nullable();
            // Ghi chú: "Massage cho 2 người", "Giặt 3 áo"

            $table->foreignId('added_by')
                  ->nullable()
                  ->constrained('users');
            // Lễ tân nào thêm dịch vụ này

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_services');
    }
};