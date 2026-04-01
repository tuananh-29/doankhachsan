<?php
namespace App\Http\Controllers;

use App\Models\RoomCategory;
use Illuminate\Http\Request;

class RoomCategoryController extends Controller
{
    // GET /api/room-categories — public
    public function index()
    {
        return response()->json(
            RoomCategory::withCount([
                'rooms',
                'rooms as available_count' => fn($q) =>
                    $q->where('status', 'available')
            ])
            ->get()
            ->map(fn($cat) => [
                ...$cat->toArray(),
                'amenities' => json_decode($cat->amenities ?? '[]', true),
            ])
        );
    }

    // POST /api/room-categories — manager only
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'            => 'required|string',
            'description'     => 'nullable|string',
            'price_per_night' => 'required|integer|min:0',
            'amenities'       => 'nullable|array',
            'image_url'       => 'nullable|string',
        ]);

        $data['amenities'] = json_encode($data['amenities'] ?? []);

        return response()->json(
            RoomCategory::create($data), 201
        );
    }

    // PUT /api/room-categories/{cat}
    public function update(Request $request, RoomCategory $cat)
    {
        $data = $request->validate([
            'name'            => 'sometimes|string',
            'price_per_night' => 'sometimes|integer|min:0',
            'amenities'       => 'nullable|array',
        ]);

        if (isset($data['amenities'])) {
            $data['amenities'] = json_encode($data['amenities']);
        }

        $cat->update($data);
        return response()->json($cat);
    }

    // DELETE /api/room-categories/{cat}
    public function destroy(RoomCategory $cat)
    {
        // Không xóa nếu có phòng đang hoạt động
        if ($cat->rooms()->where('status', 'occupied')->exists()) {
            return response()->json([
                'message' => 'Không thể xóa — có phòng đang có khách'
            ], 422);
        }

        $cat->delete();
        return response()->json(['message' => 'Đã xóa loại phòng']);
    }
}