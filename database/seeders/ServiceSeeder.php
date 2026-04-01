<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name'=>'Nước suối',       'price'=>15000,  'unit'=>'chai',  'category'=>'Ẩm thực'],
            ['name'=>'Nước ngọt',       'price'=>20000,  'unit'=>'lon',   'category'=>'Ẩm thực'],
            ['name'=>'Bữa sáng',        'price'=>150000, 'unit'=>'người', 'category'=>'Ẩm thực'],
            ['name'=>'Giặt áo',         'price'=>25000,  'unit'=>'cái',   'category'=>'Giặt ủi'],
            ['name'=>'Giặt quần',       'price'=>30000,  'unit'=>'cái',   'category'=>'Giặt ủi'],
            ['name'=>'Massage 60 phút', 'price'=>350000, 'unit'=>'lượt',  'category'=>'Spa'],
            ['name'=>'Thuê xe máy',     'price'=>150000, 'unit'=>'ngày',  'category'=>'Di chuyển'],
            ['name'=>'Đưa đón sân bay', 'price'=>300000, 'unit'=>'lượt',  'category'=>'Di chuyển'],
        ];

        foreach ($services as $s) {
            Service::firstOrCreate(['name' => $s['name']], $s);
        }

        echo "✅ Services seeded!\n";
    }
}