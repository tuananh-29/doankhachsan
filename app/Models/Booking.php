<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id', 'room_id', 'checkin', 'checkout',
        'guests', 'note', 'room_total', 'status'
    ];
    // Đổi 'total' → 'room_total' (tiền phòng)
    // Grand total = room_total + tổng dịch vụ

    public function user()    { return $this->belongsTo(User::class); }
    public function room()    { return $this->belongsTo(Room::class); }

    // Quan hệ với dịch vụ qua bảng trung gian
    public function services()
    {
        return $this->belongsToMany(Service::class, 'booking_services')
                    ->withPivot('quantity', 'price_at_time', 'note', 'added_by')
                    ->withTimestamps();
    }

    // Tính tổng tiền dịch vụ
    public function getServiceTotalAttribute(): int
    {
        return $this->services->sum(fn($s) =>
            $s->pivot->price_at_time * $s->pivot->quantity
        );
    }

    // Tổng hóa đơn cuối cùng
    public function getGrandTotalAttribute(): int
    {
        return $this->room_total + $this->service_total;
    }
}