<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    // GET /api/bookings — lấy đặt phòng
    public function index(Request $request)
    {
        $user = $request->user();

        $q = Booking::with(['user:id,name,email,phone', 'room:id,room_number,floor,room_category_id', 'room.category:id,name,price_per_night,image_url']);

        // guest chỉ thấy booking của mình
        if ($user->role === 'guest') {
            $q->where('user_id', $user->id);
        }

        $bookings = $q->orderByDesc('created_at')->get();

        return response()->json($bookings->map(fn($b) => [
            'id'           => $b->id,
            'user_id'      => $b->user_id,
            'room_id'      => $b->room_id,
            'checkin'      => $b->checkin,
            'checkout'     => $b->checkout,
            'guests'       => $b->guests,
            'note'         => $b->note,
            'room_total'   => $b->room_total,
            'status'       => $b->status,
            'created_at'   => $b->created_at,
            // thông tin user
            'user_name'    => $b->user?->name,
            'user_email'   => $b->user?->email,
            'user_phone'   => $b->user?->phone,
            // thông tin phòng
            'room_number'  => $b->room?->room_number,
            'room_floor'   => $b->room?->floor,
            // thông tin loại phòng
            'room_type'    => $b->room?->category?->name,
            'room_name'    => $b->room?->category?->name,
            'room_price'   => $b->room?->category?->price_per_night,
            'room_image'   => $b->room?->category?->image_url,
        ]));
    }

    // GET /api/bookings/my — chỉ booking của mình
    public function myBookings(Request $request)
    {
        $bookings = Booking::with(['room:id,room_number,floor,room_category_id', 'room.category:id,name,price_per_night,image_url'])
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($bookings->map(fn($b) => [
            'id'          => $b->id,
            'checkin'     => $b->checkin,
            'checkout'    => $b->checkout,
            'guests'      => $b->guests,
            'note'        => $b->note,
            'room_total'  => $b->room_total,
            'status'      => $b->status,
            'created_at'  => $b->created_at,
            'room_number' => $b->room?->room_number,
            'room_type'   => $b->room?->category?->name,
            'room_name'   => $b->room?->category?->name,
            'room_image'  => $b->room?->category?->image_url,
        ]));
    }

    // POST /api/bookings — tạo đặt phòng
    public function store(Request $request)
    {
        $request->validate([
            'room_id'  => 'required|exists:rooms,id',
            'checkin'  => 'required|date|after_or_equal:today',
            'checkout' => 'required|date|after:checkin',
            'guests'   => 'nullable|string',
            'note'     => 'nullable|string',
        ]);

        $room = Room::with('category')->findOrFail($request->room_id);

        if ($room->status !== 'available') {
            return response()->json(['message' => 'Phòng đã được đặt'], 422);
        }

        $nights = (int) ceil(
            (strtotime($request->checkout) - strtotime($request->checkin)) / 86400
        );

        $total = $room->category->price_per_night * $nights;

        $booking = Booking::create([
            'user_id'    => $request->user()->id,
            'room_id'    => $room->id,
            'checkin'    => $request->checkin,
            'checkout'   => $request->checkout,
            'guests'     => $request->guests ?? '1 khách',
            'note'       => $request->note ?? '',
            'room_total' => $total,
            'status'     => 'confirmed',
        ]);

        // Cập nhật trạng thái phòng
        $room->update(['status' => 'occupied']);

        return response()->json([
            'id'          => $booking->id,
            'checkin'     => $booking->checkin,
            'checkout'    => $booking->checkout,
            'room_total'  => $booking->room_total,
            'status'      => $booking->status,
            'room_number' => $room->room_number,
            'room_name'   => $room->category?->name,
            'room_image'  => $room->category?->image_url,
            'nights'      => $nights,
        ], 201);
    }

    // PATCH /api/bookings/{booking}/status
    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,checked_in,checked_out,cancelled'
        ]);

        $booking->update(['status' => $request->status]);

        // Hủy → trả phòng về available
        if ($request->status === 'cancelled') {
            $booking->room->update(['status' => 'available']);
        }

        // Check-out → trả phòng về available
        if ($request->status === 'checked_out') {
            $booking->room->update(['status' => 'available']);
        }

        return response()->json([
            'message' => 'Đã cập nhật trạng thái',
            'status'  => $request->status,
        ]);
    }

    // DELETE /api/bookings/{booking} — hủy
    public function cancel(Request $request, Booking $booking)
    {
        $user = $request->user();

        // Chỉ được hủy booking của mình hoặc là staff
        if ($user->role === 'guest' && $booking->user_id !== $user->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }

        $booking->update(['status' => 'cancelled']);
        $booking->room->update(['status' => 'available']);

        return response()->json(['message' => 'Đã hủy đặt phòng']);
    }
}