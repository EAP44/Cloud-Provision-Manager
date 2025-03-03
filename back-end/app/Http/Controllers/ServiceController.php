<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'storage' => 'required|integer',
            'price' => 'required|numeric',
        ]);
        $service = Service::create($request->all());
        return response()->json(['message' => 'Service created successfully', 'service' => $service], 200);
    }
    public function show(int $service)
    {
        $service = Service::where('service_id', $service)->first();
        return response()->json(['service' => $service]);
    }
}
