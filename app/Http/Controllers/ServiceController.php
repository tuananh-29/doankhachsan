<?php
namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // GET /api/services — public
    public function index()
    {
        return response()->json(
            Service::where('is_active', true)
                   ->orderBy('category')
                   ->get()
        );
    }

    // POST /api/services — manager only
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string',
            'price'    => 'required|integer|min:0',
            'unit'     => 'required|string',
            'category' => 'nullable|string',
        ]);

        return response()->json(Service::create($data), 201);
    }

    // PUT /api/services/{service} — manager only
    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'name'      => 'sometimes|string',
            'price'     => 'sometimes|integer|min:0',
            'unit'      => 'sometimes|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $service->update($data);
        return response()->json($service);
    }
}