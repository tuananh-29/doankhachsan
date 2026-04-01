<?php
namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // GET /api/rooms?category_id=1&status=available
    public function index(Request $request)
    {
        $q = Room::with('category');

        if ($request->category_id)
            $q->where('room_category_id', $request->category_id);

        if ($request->status)
            $q->where('status', $request->status);

        return response()->json(
            $q->orderBy('room_number')->get()
              ->map(fn($r) => $this->format($r))
        );
    }

    // POST /api/rooms — manager only
    public function store(Request $request)
    {
        $data = $request->validate([
            'room_category_id' => 'required|exists:room_categories,id',
            'room_number'      => 'required|string|unique:rooms',
            'floor'            => 'nullable|string',
            'status'           => 'nullable|in:available,occupied,maintenance',
            'notes'            => 'nullable|string',
        ]);

        $room = Room::create($data);
        return response()->json($this->format($room->load('category')), 201);
    }

    // PUT /api/rooms/{room} — manager only
    public function update(Request $request, Room $room)
    {
        $data = $request->validate([
            'room_category_id' => 'sometimes|exists:room_categories,id',
            'room_number'      => 'sometimes|unique:rooms,room_number,'.$room->id,
            'status'           => 'sometimes|in:available,occupied,maintenance',
            'notes'            => 'nullable|string',
        ]);

        $room->update($data);
        return response()->json($this->format($room->fresh()->load('category')));
    }

    // DELETE /api/rooms/{room} — manager only
    public function destroy(Room $room)
    {
        if ($room->status === 'occupied') {
            return response()->json([
                'message' => 'Không thể xóa phòng đang có khách'
            ], 422);
        }
        $room->delete();
        return response()->json(['message' => 'Đã xóa phòng']);
    }

    // Format dữ liệu trả về
    private function format(Room $r): array
    {
        return [
            'id'          => $r->id,
            'room_number' => $r->room_number,
            'floor'       => $r->floor,
            'status'      => $r->status,
            'notes'       => $r->notes,
            // Thông tin từ loại phòng
            'category_id'   => $r->room_category_id,
            'category_name' => $r->category?->name,
            'price'         => $r->category?->price_per_night,
            'description'   => $r->category?->description,
            'amenities'     => json_decode($r->category?->amenities ?? '[]', true),
            'image_url'     => $r->category?->image_url,
        ];
    }
}