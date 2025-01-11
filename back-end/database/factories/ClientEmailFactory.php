<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientEmailFactory extends Factory
{
    public function definition()
    {
        return [
            'client_id' => Client::all()->random()->id,
            'email' => $this->faker->unique()->regexify('[a-zA-Z0-9]{8}@[a-zA-Z0-9]{10}\.[a-zA-Z]{3}'),
        ];
    }
}
