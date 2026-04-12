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
        // ===== 1. USERS (Tài khoản người dùng) =====
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

        // ===== 2. ROOM CATEGORIES (Loại phòng) =====
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
                'amenities'       => json_encode(['WiFi','Smart TV 55"','Điều hòa 2 chiều','Minibar','Bồn tắm']),
                'image_url'       => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
            ],
            [
                'name'            => 'Suite',
                'description'     => 'Phòng Suite cao cấp bậc nhất với không gian phòng khách riêng biệt và dịch vụ VIP.',
                'price_per_night' => 4500000,
                'amenities'       => json_encode(['WiFi Tốc độ cao','Smart TV 65"','Phòng khách','Bồn tắm massage', 'Ban công']),
                'image_url'       => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
            ]
        ];

        foreach ($cats as $cat) {
            RoomCategory::firstOrCreate(['name' => $cat['name']], $cat);
        }

        // ===== 3. ROOMS (Phòng Vật Lý) =====
        // Lấy ID của các loại phòng vừa tạo ở trên để làm khóa ngoại
        $standardId = RoomCategory::where('name', 'Standard')->first()->id;
        $deluxeId   = RoomCategory::where('name', 'Deluxe')->first()->id;
        $suiteId    = RoomCategory::where('name', 'Suite')->first()->id;

        $rooms = [
            [
                'room_number'      => '101', 
                'room_category_id' => $standardId, 
                'floor'            => '1', 
                'status'           => 'available',
                'notes'            => 'Gần thang máy'
            ],
            [
                'room_number'      => '102', 
                'room_category_id' => $standardId, 
                'floor'            => '1', 
                'status'           => 'available',
                'notes'            => ''
            ],
            [
                'room_number'      => '201', 
                'room_category_id' => $deluxeId,   
                'floor'            => '2', 
                'status'           => 'available',
                'notes'            => 'View biển'
            ],
            [
                'room_number'      => '202', 
                'room_category_id' => $deluxeId,   
                'floor'            => '2', 
                'status'           => 'available',
                'notes'            => 'View thành phố'
            ],
            [
                'room_number'      => '301', 
                'room_category_id' => $suiteId,    
                'floor'            => '3', 
                'status'           => 'available',
                'notes'            => 'Phòng tổng thống, góc nhìn 180 độ'
            ],
        ];

        foreach ($rooms as $room) {
            Room::firstOrCreate(['room_number' => $room['room_number']], $room);
        }

        // ===== 4. SERVICES (Dịch vụ khách sạn) =====
        $services = [
            ['name' => 'Nước suối Dasani', 'price' => 15000, 'unit' => 'chai', 'category' => 'Đồ uống'],
            ['name' => 'Coca Cola', 'price' => 25000, 'unit' => 'lon', 'category' => 'Đồ uống'],
            ['name' => 'Ăn sáng Buffet', 'price' => 150000, 'unit' => 'vé', 'category' => 'Ẩm thực'],
            ['name' => 'Giặt ủi quần áo', 'price' => 50000, 'unit' => 'kg', 'category' => 'Vệ sinh'],
            ['name' => 'Thuê xe máy', 'price' => 150000, 'unit' => 'ngày', 'category' => 'Di chuyển'],
            ['name' => 'Massage Thư giãn', 'price' => 350000, 'unit' => 'lượt', 'category' => 'Spa'],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(['name' => $service['name']], $service);
        }
    }
}