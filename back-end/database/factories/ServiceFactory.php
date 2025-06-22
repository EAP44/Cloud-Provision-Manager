<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'storage' => $this->faker->randomElement(['1TB', '2TB', '5TB']),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'default_canva_mail' => $this->faker->randomElement(['info@gmail.com', 'support@gmail.com']),
        ];
    }
}
