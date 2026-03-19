<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(['email' => 'admin@hotel.com'], [
            'name' => 'Administrator', 'password' => Hash::make('admin123'),
            'phone' => '0901000000', 'role' => 'admin',
        ]);

        User::firstOrCreate(['email' => 'user@hotel.com'], [
            'name' => 'Nguyễn Văn Nam', 'password' => Hash::make('user123'),
            'phone' => '0901234567', 'role' => 'user',
        ]);

        $rooms = [
            ['101','Standard','Standard Garden View',    1200000,'🌿','Phòng tiêu chuẩn với tầm nhìn ra khu vườn xanh mát.',                          ['WiFi','TV','Điều hòa','Minibar']],
            ['201','Deluxe',  'Deluxe Ocean View',       2500000,'🌊','Phòng Deluxe với tầm nhìn panorama ra biển, bồn tắm đứng và ban công riêng.',   ['WiFi','TV 4K','Điều hòa','Minibar','Bồn tắm','Ban công']],
            ['202','Deluxe',  'Deluxe City View',        2200000,'🌃','Phòng Deluxe với tầm nhìn thành phố lung linh về đêm.',                         ['WiFi','TV 4K','Điều hòa','Minibar','Ban công']],
            ['301','Suite',   'Premier Suite',           5000000,'🏙️','Suite cao cấp với phòng khách rộng và tầm nhìn toàn cảnh thành phố.',           ['WiFi','TV 4K','Điều hòa','Minibar','Bồn tắm Jacuzzi','Butler 24/7']],
            ['302','Suite',   'Honeymoon Suite',         7500000,'🌹','Suite lãng mạn với hoa hồng, champagne và bồn tắm hoa.',                        ['WiFi','TV 4K','Điều hòa','Minibar','Bồn tắm hoa','Champagne']],
            ['401','Presidential','Presidential Suite', 15000000,'👑','Suite tổng thống với 3 phòng ngủ, bếp riêng và hồ bơi riêng.',                  ['WiFi','TV 4K x3','Điều hòa','Bếp riêng','Hồ bơi','Butler','Rolls-Royce']],
        ];

        foreach ($rooms as [$number, $type, $name, $price, $emoji, $desc, $amenities]) {
            Room::firstOrCreate(['number' => $number], [
                'type' => $type, 'name' => $name, 'price' => $price,
                'emoji' => $emoji, 'description' => $desc,
                'amenities' => json_encode($amenities), 'status' => 'available',
            ]);
        }
    }
}
