<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name', 'email', 'password', 'phone', 'role'
    ];

    protected $hidden = ['password', 'remember_token'];
    protected $casts  = ['password' => 'hashed'];

    // Helper methods — dùng khắp nơi
    public function isGuest():        bool { return $this->role === 'guest'; }
    public function isReceptionist(): bool { return $this->role === 'receptionist'; }
    public function isManager():      bool { return $this->role === 'manager'; }

    // Manager hoặc Receptionist đều là "staff"
    public function isStaff(): bool
    {
        return in_array($this->role, ['receptionist', 'manager']);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}