<?php

namespace Database\Seeders;

use App\Models\MataKuliah;
use App\Models\Tugas;
use Illuminate\Database\Seeder;

class TugasSeeder extends Seeder
{
    public function run(): void
    {
        $mkFilsafat = MataKuliah::where('nama', 'Filsafat Ilmu Berparadigma UoS')->first();
        $mkHadits = MataKuliah::where('nama', 'Studi Al Hadits')->first();
        $mkMetopen = MataKuliah::where('nama', 'Metodologi Penelitian PAI')->first();

        if (!$mkFilsafat || !$mkHadits || !$mkMetopen) {
            $this->command->error('Mata kuliah tidak ditemukan. Jalankan MataKuliahSeeder dulu.');
            return;
        }

        $data = [
            [
                'mata_kuliah_id' => $mkFilsafat->id,
                'judul' => 'Sinopsis Buku Islamic Studies',
                'deskripsi' => 'Buat sinopsis intisari dari Buku Islamic Studies & Hierarki Ilmu',
                'deadline' => '2026-09-17 13:00:00',
            ],
            [
                'mata_kuliah_id' => $mkHadits->id,
                'judul' => 'Verifikasi Kitab Hadits',
                'deskripsi' => "Mengecek beberapa fakta kitab hadits yang sudah dipaparkan minggu lalu, apakah benar kitab tersebut sesuai deskripsi atau tidak. Misal: kitab Musnad tersusun berdasarkan nama para sahabat, kitab Muwattha mengandung hadits mauquf, maqthu', dan marfu'.",
                'deadline' => '2026-09-17 09:30:00',
            ],
            [
                'mata_kuliah_id' => $mkMetopen->id,
                'judul' => 'Pendahuluan & Literatur Review',
                'deskripsi' => 'Menyelesaikan Pendahuluan dan membuat Literatur Review',
                'deadline' => '2026-09-21 09:30:00',
            ],
        ];

        foreach ($data as $t) {
            Tugas::updateOrCreate(
                [
                    'mata_kuliah_id' => $t['mata_kuliah_id'],
                    'judul' => $t['judul'],
                ],
                $t
            );
        }
    }
}
