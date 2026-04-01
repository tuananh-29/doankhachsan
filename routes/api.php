<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomCategoryController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;

// ========== PUBLIC ==========
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::get('/rooms',          [RoomController::class, 'index']);
Route::get('/rooms/{room}',   [RoomController::class, 'show']);
Route::get('/room-categories',[RoomCategoryController::class, 'index']);
Route::get('/services',       [ServiceController::class, 'index']);

// ========== ĐÃ ĐĂNG NHẬP (mọi role) ==========
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/auth/me',      [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Guest: chỉ xem và đặt phòng của mình
    Route::get('/bookings/my',         [BookingController::class, 'myBookings']);
    Route::post('/bookings',           [BookingController::class, 'store']);
    Route::delete('/bookings/{booking}',[BookingController::class, 'cancel']);

    // ========== LỄ TÂN + MANAGER ==========
    Route::middleware('role:receptionist,manager')->group(function () {
        // Xem TẤT CẢ đặt phòng
        Route::get('/bookings',                       [BookingController::class, 'index']);
        // Chuyển trạng thái: pending→confirmed→checked_in→checked_out
        Route::patch('/bookings/{booking}/status',    [BookingController::class, 'updateStatus']);
        // Thêm dịch vụ vào đặt phòng
        Route::post('/bookings/{booking}/services',   [BookingController::class, 'addService']);
        Route::delete('/bookings/{booking}/services/{bs}', [BookingController::class, 'removeService']);
    });

    // ========== CHỈ MANAGER ==========
    Route::middleware('role:manager')->group(function () {
        // Quản lý loại phòng
        Route::post('/room-categories',         [RoomCategoryController::class, 'store']);
        Route::put('/room-categories/{cat}',    [RoomCategoryController::class, 'update']);
        Route::delete('/room-categories/{cat}', [RoomCategoryController::class, 'destroy']);

        // Quản lý phòng vật lý
        Route::post('/rooms',           [RoomController::class, 'store']);
        Route::put('/rooms/{room}',     [RoomController::class, 'update']);
        Route::delete('/rooms/{room}',  [RoomController::class, 'destroy']);

        // Quản lý dịch vụ
        Route::post('/services',         [ServiceController::class, 'store']);
        Route::put('/services/{service}',[ServiceController::class, 'update']);
        Route::delete('/services/{service}',[ServiceController::class, 'destroy']);

        // Quản lý users (chỉ manager tạo được lễ tân)
        Route::get('/users',            [UserController::class, 'index']);
        Route::post('/users/staff',     [UserController::class, 'createStaff']);
        Route::delete('/users/{user}',  [UserController::class, 'destroy']);

        // Thống kê doanh thu
        Route::get('/stats',            [UserController::class, 'stats']);
    });
});