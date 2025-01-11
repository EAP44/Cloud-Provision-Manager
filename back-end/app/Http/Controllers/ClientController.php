<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ClientEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function index()
    {
        return Client::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'company' => 'required|string',
            'email' => ['required', 'array'],
            'email.*' => 'email',
            'phone_number' => 'required|string',
            'address' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            if ($request->filled('email')) {
                $clientEmail = is_array($request->email) ? $request->email[0] : $request->email;
                $clientData = [
                    'name' => $request->name,
                    'company' => $request->company,
                    'email' => $clientEmail,
                    'phone_number' => $request->phone_number,
                    'address' => $request->address,
                ];
                $client = Client::create($clientData);
                $clientEmails = is_array($request->email) ? $request->email : [$request->email];
                foreach ($clientEmails as $email) {
                    ClientEmail::create([
                        'client_id' => $client->id,
                        'email' => $email,
                    ]);
                }
            }
            DB::commit();

            return response()->json(['message' => 'Client created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['message' => 'Failed to create client', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(int $clients)
    {
        $clients = Client::where('client_id', $clients)->first();
        return response()->json(['clients' => $clients]);
    }
}
