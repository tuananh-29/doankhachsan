<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(['email' => 'manager@hotel.com'], [
            'name'     => 'Nguyễn Hoàng Manager',
            'password' => Hash::make('manager123'),
            'phone'    => '0901000001',
            'role'     => 'manager',
        ]);

        User::firstOrCreate(['email' => 'receptionist@hotel.com'], [
            'name'     => 'Trần Thị Lễ Tân',
            'password' => Hash::make('recept123'),
            'phone'    => '0901000002',
            'role'     => 'receptionist',
        ]);

        User::firstOrCreate(['email' => 'guest@hotel.com'], [
            'name'     => 'Lê Văn Khách',
            'password' => Hash::make('guest123'),
            'phone'    => '0901234567',
            'role'     => 'guest',
        ]);

        echo "✅ Users seeded!\n";
    }
}