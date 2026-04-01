<?php
// Thêm 2 method mới vào BookingController

// POST /api/bookings/{booking}/services
// Lễ tân thêm dịch vụ cho đặt phòng đang diễn ra
public function addService(Request $request, Booking $booking)
{
    // Chỉ được thêm nếu booking còn active
    if (!in_array($booking->status, ['confirmed', 'checked_in'])) {
        return response()->json([
            'message' => 'Không thể thêm dịch vụ cho booking này'
        ], 422);
    }

    $data = $request->validate([
        'service_id' => 'required|exists:services,id',
        'quantity'   => 'required|integer|min:1',
        'note'       => 'nullable|string',
    ]);

    $service = \App\Models\Service::findOrFail($data['service_id']);

    // Dùng attach() để thêm vào bảng trung gian
    $booking->services()->attach($data['service_id'], [
        'quantity'      => $data['quantity'],
        'price_at_time' => $service->price,
        // LƯU GIÁ LÚC GỌI — không lấy giá hiện tại sau này
        'note'          => $data['note'] ?? null,
        'added_by'      => $request->user()->id,
    ]);

    // Load lại booking với dịch vụ
    $booking->load('services');

    return response()->json([
        'message'       => 'Đã thêm dịch vụ',
        'service_total' => $booking->service_total,
        'grand_total'   => $booking->grand_total,
        'services'      => $booking->services,
    ]);
}

// DELETE /api/bookings/{booking}/services/{bs}
public function removeService(Booking $booking, int $bs)
{
    // $bs = booking_services.id
    \DB::table('booking_services')->where('id', $bs)->delete();

    $booking->load('services');
    return response()->json([
        'message'       => 'Đã xóa dịch vụ',
        'grand_total'   => $booking->grand_total,
    ]);
}

// Cập nhật method index() để trả về cả dịch vụ
public function index(Request $request)
{
    $user = $request->user();
    $q    = Booking::with(['user', 'room.category', 'services']);

    if ($user->role === 'guest') {
        $q->where('user_id', $user->id);
    }

    return response()->json(
        $q->orderByDesc('created_at')->get()
          ->map(fn($b) => [
              ...$b->toArray(),
              'room_number'    => $b->room?->room_number,
              'category_name'  => $b->room?->category?->name,
              'user_name'      => $b->user?->name,
              'service_total'  => $b->service_total,
              'grand_total'    => $b->grand_total,
          ])
    );
}<?php
// Thêm 2 method mới vào BookingController

// POST /api/bookings/{booking}/services
// Lễ tân thêm dịch vụ cho đặt phòng đang diễn ra
public function addService(Request $request, Booking $booking)
{
    // Chỉ được thêm nếu booking còn active
    if (!in_array($booking->status, ['confirmed', 'checked_in'])) {
        return response()->json([
            'message' => 'Không thể thêm dịch vụ cho booking này'
        ], 422);
    }

    $data = $request->validate([
        'service_id' => 'required|exists:services,id',
        'quantity'   => 'required|integer|min:1',
        'note'       => 'nullable|string',
    ]);

    $service = \App\Models\Service::findOrFail($data['service_id']);

    // Dùng attach() để thêm vào bảng trung gian
    $booking->services()->attach($data['service_id'], [
        'quantity'      => $data['quantity'],
        'price_at_time' => $service->price,
        // LƯU GIÁ LÚC GỌI — không lấy giá hiện tại sau này
        'note'          => $data['note'] ?? null,
        'added_by'      => $request->user()->id,
    ]);

    // Load lại booking với dịch vụ
    $booking->load('services');

    return response()->json([
        'message'       => 'Đã thêm dịch vụ',
        'service_total' => $booking->service_total,
        'grand_total'   => $booking->grand_total,
        'services'      => $booking->services,
    ]);
}

// DELETE /api/bookings/{booking}/services/{bs}
public function removeService(Booking $booking, int $bs)
{
    // $bs = booking_services.id
    \DB::table('booking_services')->where('id', $bs)->delete();

    $booking->load('services');
    return response()->json([
        'message'       => 'Đã xóa dịch vụ',
        'grand_total'   => $booking->grand_total,
    ]);
}

// Cập nhật method index() để trả về cả dịch vụ
public function index(Request $request)
{
    $user = $request->user();
    $q    = Booking::with(['user', 'room.category', 'services']);

    if ($user->role === 'guest') {
        $q->where('user_id', $user->id);
    }

    return response()->json(
        $q->orderByDesc('created_at')->get()
          ->map(fn($b) => [
              ...$b->toArray(),
              'room_number'    => $b->room?->room_number,
              'category_name'  => $b->room?->category?->name,
              'user_name'      => $b->user?->name,
              'service_total'  => $b->service_total,
              'grand_total'    => $b->grand_total,
          ])
    );
}