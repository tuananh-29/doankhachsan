<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $q    = Booking::with(['user:id,name,email,phone', 'room:id,name,number,type,emoji,price']);

        if ($user->role !== 'admin') $q->where('user_id', $user->id);

        return response()->json($q->orderByDesc('created_at')->get()->map(fn($b) => [
            ...$b->toArray(),
            'user_name'   => $b->user?->name,
            'user_email'  => $b->user?->email,
            'user_phone'  => $b->user?->phone,
            'room_name'   => $b->room?->name,
            'room_number' => $b->room?->number,
            'room_type'   => $b->room?->type,
            'room_emoji'  => $b->room?->emoji,
            'room_price'  => $b->room?->price,
        ]));
    }

    public function store(Request $request)
    {
        $request->validate([
            'room_id'  => 'required|exists:rooms,id',
            'checkin'  => 'required|date|after_or_equal:today',
            'checkout' => 'required|date|after:checkin',
            'guests'   => 'nullable|string',
            'note'     => 'nullable|string',
        ]);

        $room = Room::findOrFail($request->room_id);
        if ($room->status !== 'available') {
            return response()->json(['message' => 'Phòng đã được đặt'], 422);
        }

        $nights  = (int) ceil((strtotime($request->checkout) - strtotime($request->checkin)) / 86400);
        $total   = $room->price * $nights;

        $booking = Booking::create([
            'user_id'  => $request->user()->id,
            'room_id'  => $room->id,
            'checkin'  => $request->checkin,
            'checkout' => $request->checkout,
            'guests'   => $request->guests ?? '1 khách',
            'note'     => $request->note ?? '',
            'total'    => $total,
            'status'   => 'confirmed',
        ]);

        $room->update(['status' => 'booked']);

        return response()->json([
            ...$booking->toArray(),
            'room_name'  => $room->name,
            'room_emoji' => $room->emoji,
            'nights'     => $nights,
        ], 201);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate(['status' => 'required|in:confirmed,pending,cancelled']);
        $booking->update(['status' => $request->status]);
        if ($request->status === 'cancelled') {
            $booking->room->update(['status' => 'available']);
        }
        return response()->json(['message' => 'Đã cập nhật', 'status' => $request->status]);
    }

    public function cancel(Request $request, Booking $booking)
    {
        $user = $request->user();
        if ($user->role !== 'admin' && $booking->user_id !== $user->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }
        $booking->update(['status' => 'cancelled']);
        $booking->room->update(['status' => 'available']);
        return response()->json(['message' => 'Đã hủy đặt phòng']);
    }
}
