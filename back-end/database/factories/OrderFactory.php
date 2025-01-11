<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition()
    {
        return [
            'client_id' => Client::all()->random()->id,
            'service_id' => Service::all()->random()->id,
            'order_date' => $this->faker->date(),
            'license_expiration_date' => $this->faker->date(),
            'note' => $this->faker->sentence,
        ];
    }
}
