<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('room_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // Standard, Deluxe, Suite, Presidential
            $table->text('description')->nullable();
            $table->unsignedBigInteger('price_per_night');
            // Giá chuẩn của loại phòng này
            $table->text('amenities')->nullable();
            // JSON: ["WiFi","TV","Điều hòa"]
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_categories');
    }
};