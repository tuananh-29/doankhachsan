<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();

            // Liên kết với loại phòng
            $table->foreignId('room_category_id')
                  ->constrained('room_categories')
                  ->cascadeOnDelete();

            $table->string('room_number')->unique();
            // Số phòng thực tế: 101, 102, 201...

            $table->string('floor')->nullable();
            // Tầng: "1", "2", "Penthouse"

            $table->enum('status', [
                'available',    // Sẵn sàng
                'occupied',     // Có khách đang ở
                'maintenance',  // Đang bảo trì/dọn dẹp
            ])->default('available');

            $table->text('notes')->nullable();
            // Ghi chú nội bộ (view biển, góc...)

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};