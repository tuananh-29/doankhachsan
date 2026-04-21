<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Room;
use App\Models\RoomCategory;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
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

        $cats = [
            [
                'name'            => 'Standard',
                'description'     => 'Phòng tiêu chuẩn với tầm nhìn ra khu vườn xanh mát.',
                'price_per_night' => 1200000,
                'amenities'       => json_encode(['WiFi','TV','Điều hòa','Minibar']),
                'image_url'       => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
            ],
            [
                'name'            => 'Deluxe',
                'description'     => 'Phòng Deluxe sang trọng với tầm nhìn panorama, bồn tắm và ban công riêng.',
                'price_per_night' => 2500000,
                'amenities'       => json_encode(['WiFi','TV 4K','Điều hòa','Minibar','Bồn tắm','Ban công']),
                'image_url'       => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
            ],
            [
                'name'            => 'Suite',
                'description'     => 'Suite cao cấp với phòng khách rộng và tầm nhìn toàn cảnh.',
                'price_per_night' => 5000000,
                'amenities'       => json_encode(['WiFi','TV 4K','Điều hòa','Minibar','Bồn tắm Jacuzzi','Butler 24/7']),
                'image_url'       => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
            ],
            [
                'name'            => 'Presidential',
                'description'     => 'Suite tổng thống với 3 phòng ngủ, bếp riêng và hồ bơi riêng.',
                'price_per_night' => 15000000,
                'amenities'       => json_encode(['WiFi','TV 4K x3','Điều hòa','Bếp riêng','Hồ bơi','Butler']),
                'image_url'       => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
            ],
        ];

        foreach ($cats as $cat) {
            RoomCategory::firstOrCreate(['name' => $cat['name']], $cat);
        }

        $std  = RoomCategory::where('name', 'Standard')->first();
        $dlx  = RoomCategory::where('name', 'Deluxe')->first();
        $suit = RoomCategory::where('name', 'Suite')->first();
        $pres = RoomCategory::where('name', 'Presidential')->first();

        $rooms = [
            ['room_category_id' => $std->id,  'room_number' => '101', 'floor' => '1', 'status' => 'available'],
            ['room_category_id' => $std->id,  'room_number' => '102', 'floor' => '1', 'status' => 'available'],
            ['room_category_id' => $std->id,  'room_number' => '103', 'floor' => '1', 'status' => 'available'],
            ['room_category_id' => $dlx->id,  'room_number' => '201', 'floor' => '2', 'status' => 'available'],
            ['room_category_id' => $dlx->id,  'room_number' => '202', 'floor' => '2', 'status' => 'available'],
            ['room_category_id' => $suit->id, 'room_number' => '301', 'floor' => '3', 'status' => 'available'],
            ['room_category_id' => $suit->id, 'room_number' => '302', 'floor' => '3', 'status' => 'available'],
            ['room_category_id' => $pres->id, 'room_number' => '401', 'floor' => '4', 'status' => 'available'],
        ];

        foreach ($rooms as $room) {
            Room::firstOrCreate(['room_number' => $room['room_number']], $room);
        }

        $services = [
            ['name' => 'Nước suối',       'price' => 15000,  'unit' => 'chai',  'category' => 'Ẩm thực'],
            ['name' => 'Nước ngọt',       'price' => 20000,  'unit' => 'lon',   'category' => 'Ẩm thực'],
            ['name' => 'Bữa sáng',        'price' => 150000, 'unit' => 'người', 'category' => 'Ẩm thực'],
            ['name' => 'Giặt áo',         'price' => 25000,  'unit' => 'cái',   'category' => 'Giặt ủi'],
            ['name' => 'Giặt quần',       'price' => 30000,  'unit' => 'cái',   'category' => 'Giặt ủi'],
            ['name' => 'Massage 60 phút', 'price' => 350000, 'unit' => 'lượt',  'category' => 'Spa'],
            ['name' => 'Thuê xe máy',     'price' => 150000, 'unit' => 'ngày',  'category' => 'Di chuyển'],
            ['name' => 'Đưa đón sân bay', 'price' => 300000, 'unit' => 'lượt',  'category' => 'Di chuyển'],
        ];

        foreach ($services as $s) {
            Service::firstOrCreate(['name' => $s['name']], $s);
        }

        echo "\n✅ Seed xong!\n";
        echo "   manager@hotel.com      / manager123\n";
        echo "   receptionist@hotel.com / recept123\n";
        echo "   guest@hotel.com        / guest123\n";
    }
}