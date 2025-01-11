<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        User::factory()->create([
            'name' => 'Ayoub',
            'email' => 'ayoub@casanet.ma',
            'password' => '123456789',
        ]);
        User::factory()->count(10)->create();
        Client::factory()->count(10)->create();
        Service::factory()->count(10)->create();
        Product::factory()->count(10)->create();
    }
}
