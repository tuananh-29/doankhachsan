<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomCategory extends Model
{
    protected $fillable = [
        'name', 'description', 'price_per_night',
        'amenities', 'image_url'
    ];

    // 1 loại phòng có nhiều phòng vật lý
    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    // Đếm phòng còn trống
    public function availableRooms()
    {
        return $this->rooms()->where('status', 'available');
    }
}