<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::withCount('bookings')->orderByDesc('created_at')->get()
                ->map(fn($u) => [
                    'id'            => $u->id,
                    'name'          => $u->name,
                    'email'         => $u->email,
                    'phone'         => $u->phone,
                    'role'          => $u->role,
                    'created_at'    => $u->created_at,
                    'booking_count' => $u->bookings_count,
                ])
        );
    }
}
