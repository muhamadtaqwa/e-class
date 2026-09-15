<?php

namespace Database\Seeders;

use App\Models\MataKuliah;
use Illuminate\Database\Seeder;

class MataKuliahSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'nama' => "Studi Al Qur'an",
                'dosen' => 'Prof. Dr. H. Musthofa M.Ag. & Dr. Hj. Nur Asiyah M.S.I',
                'hari' => 'Senin',
                'jam' => '07:00',
                'tempat' => 'C7',
            ],
            [
                'nama' => 'Metodologi Penelitian PAI',
                'dosen' => 'Prof. Dr. H. Raharjo M.Ed.,St. & Prof. Dr. Ikhrom M.Ag',
                'hari' => 'Senin',
                'jam' => '09:30',
                'tempat' => 'C8',
            ],
            [
                'nama' => 'Statistika Penelitian Pendidikan',
                'dosen' => 'Prof. Dr. H. Mustaqim M.Pd & Prof. Dr. H. Shodiq M.Ag',
                'hari' => 'Kamis',
                'jam' => '07:30',
                'tempat' => 'C8',
            ],
            [
                'nama' => 'Studi Al Hadits',
                'dosen' => 'Dr. H. Alis Asikin M.A. & Dr. Nasirudin M.Ag.',
                'hari' => 'Kamis',
                'jam' => '09:30',
                'tempat' => 'C7',
            ],
            [
                'nama' => 'Filsafat Ilmu Berparadigma UoS',
                'dosen' => "Prof. Dr. H. Abd. Rachman M.A. & Prof. Dr. Fihris M.Ag",
                'hari' => 'Kamis',
                'jam' => '13:00',
                'tempat' => 'C7',
            ],
            [
                'nama' => 'Teori-Teori Belajar',
                'dosen' => 'Agus Mutohar MA., Ph.D. & Dr. H. Ruswan MA.',
                'hari' => 'Jumat',
                'jam' => '07:00',
                'tempat' => 'C7',
            ],
            [
                'nama' => 'Pengembangan Kurikulum dan Pembelajaran PAI berbasis Teknologi Digital',
                'dosen' => 'Prof. Dr. H. Abdul Rohman M.Ag & Dr. Hamdan Husein Batubara M.Pd.I.',
                'hari' => 'Jumat',
                'jam' => '09:30',
                'tempat' => 'C8',
            ],
        ];

        foreach ($data as $mk) {
            MataKuliah::updateOrCreate(
                ['nama' => $mk['nama']],
                $mk
            );
        }
    }
}
