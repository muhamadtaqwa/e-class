<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'e-class@ilmuna.id'],
            [
                'name' => 'Kelas S2 PAI',
                'password' => Hash::make('ilmuna123'),
            ]
        );
    }
}
