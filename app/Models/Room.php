<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'room_category_id', 'room_number',
        'floor', 'status', 'notes'
    ];

    // Thuộc về 1 loại phòng
    public function category()
    {
        return $this->belongsTo(RoomCategory::class, 'room_category_id');
    }

    // Có nhiều booking
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}