<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $q = Room::query();
        if ($request->type)   $q->where('type', $request->type);
        if ($request->status) $q->where('status', $request->status);
        return response()->json($q->orderBy('id')->get()->map(fn($r) => $this->parse($r)));
    }

    public function show(Room $room)
    {
        return response()->json($this->parse($room));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'number'      => 'required|string|unique:rooms',
            'type'        => 'required|in:Standard,Deluxe,Suite,Presidential',
            'name'        => 'required|string',
            'price'       => 'required|integer|min:0',
            'status'      => 'nullable|in:available,booked',
            'description' => 'nullable|string',
            'amenities'   => 'nullable|array',
            'emoji'       => 'nullable|string',
        ]);
        $data['amenities'] = json_encode($data['amenities'] ?? []);
        $data['emoji']     = $data['emoji'] ?? '🛏️';
        $data['status']    = $data['status'] ?? 'available';
        return response()->json($this->parse(Room::create($data)), 201);
    }

    public function update(Request $request, Room $room)
    {
        $data = $request->validate([
            'number'      => 'sometimes|string|unique:rooms,number,'.$room->id,
            'type'        => 'sometimes|in:Standard,Deluxe,Suite,Presidential',
            'name'        => 'sometimes|string',
            'price'       => 'sometimes|integer|min:0',
            'status'      => 'nullable|in:available,booked',
            'description' => 'nullable|string',
            'amenities'   => 'nullable|array',
            'emoji'       => 'nullable|string',
        ]);
        if (isset($data['amenities'])) $data['amenities'] = json_encode($data['amenities']);
        $room->update($data);
        return response()->json($this->parse($room->fresh()));
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(['message' => 'Đã xóa phòng']);
    }

    private function parse(Room $r): array
    {
        $arr = $r->toArray();
        $arr['amenities'] = json_decode($r->amenities ?? '[]', true);
        return $arr;
    }
}
