<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;

// Public
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::get('/rooms',          [RoomController::class, 'index']);
Route::get('/rooms/{room}',   [RoomController::class, 'show']);

// Authenticated
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me',           [AuthController::class, 'me']);
    Route::post('/auth/logout',      [AuthController::class, 'logout']);

    Route::get('/bookings',              [BookingController::class, 'index']);
    Route::post('/bookings',             [BookingController::class, 'store']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'cancel']);

    // Admin only
    Route::middleware('role:admin')->group(function () {
        Route::post('/rooms',                      [RoomController::class, 'store']);
        Route::put('/rooms/{room}',                [RoomController::class, 'update']);
        Route::delete('/rooms/{room}',             [RoomController::class, 'destroy']);
        Route::patch('/bookings/{booking}/status', [BookingController::class, 'updateStatus']);
        Route::get('/users',                       [UserController::class, 'index']);
    });
});
