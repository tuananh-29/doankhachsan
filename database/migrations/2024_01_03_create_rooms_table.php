<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique();
            $table->string('type');
            $table->string('name');
            $table->unsignedBigInteger('price');
            $table->string('status')->default('available');
            $table->text('description')->nullable();
            $table->text('amenities')->nullable();
            $table->string('emoji')->default('🛏️');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('rooms'); }
};
