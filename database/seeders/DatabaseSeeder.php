<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\City;
use App\Models\Country;
use App\Models\Tag;
use App\Models\Ticket;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Country::create(['name' => 'Kenya']);
        Country::create(['name' => 'Uganda']);
        Country::create(['name' => 'Tanzania']);
        City::create(['country_id' => 1, 'name' => 'Nairobi']);
        City::create(['country_id' => 1, 'name' => 'Mombasa']);
        City::create(['country_id' => 2, 'name' => 'Kampala']);
        City::create(['country_id' => 2, 'name' => 'Jinja']);
        City::create(['country_id' => 3, 'name' => 'Arusha']);
        City::create(['country_id' => 3, 'name' => 'Dar es Salaam']);
        Ticket::create(['name' => 'VIP']);
        Ticket::create(['name' => 'Regular']);

        Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        Tag::create(['name' => 'React', 'slug' => 'react']);
        Tag::create(['name' => 'Livewire', 'slug' => 'livewire']);
    }
}
