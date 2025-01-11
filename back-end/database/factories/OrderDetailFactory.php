<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailFactory extends Factory
{
    public function definition()
    {
        return [
            'order_id' => Order::all()->random()->id,
            'product_id' => Product::all()->random()->id,
            'product_code' => $this->faker->regexify('[A-Za-z0-9]{10}'),
            'quantity' => $this->faker->numberBetween(1, 10),
        ];
    }
}
