<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use Illuminate\Database\Seeder;

class MahasiswaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['nim' => '26031280001', 'nama' => 'Muhamad Taqwa', 'no_wa' => '08985949733'],
            ['nim' => '26031280002', 'nama' => 'Mazaya Azmi Zahira', 'no_wa' => '081548938440'],
            ['nim' => '26031280003', 'nama' => "Lina Hidayatun Nafi'ah", 'no_wa' => '0895706340206'],
            ['nim' => '26031280004', 'nama' => 'Muhammad Ashif Barkhoya Mifaza', 'no_wa' => '081225488048'],
            ['nim' => '26031280005', 'nama' => 'Yuyun Rafa Novitasari', 'no_wa' => '085225676366'],
            ['nim' => '26031280006', 'nama' => 'Najma Farha Tazkia', 'no_wa' => '085712021608'],
            ['nim' => '26031280007', 'nama' => 'Taufik Hidayat', 'no_wa' => '085290286669'],
            ['nim' => '26031280008', 'nama' => 'Ahmad Alawi', 'no_wa' => '085868329185'],
            ['nim' => '26031280009', 'nama' => 'Latifun Naufa', 'no_wa' => '081226786336'],
            ['nim' => '26031280010', 'nama' => 'David Maulana Ghufron', 'no_wa' => '089601452569'],
            ['nim' => '26031280011', 'nama' => 'Nadiya Khoiriyah Zahrotul Ula', 'no_wa' => '089529091362'],
            ['nim' => '26031280012', 'nama' => 'Nur Muh Zaid Zulkarnaen', 'no_wa' => '0895346131672'],
        ];

        foreach ($data as $m) {
            Mahasiswa::updateOrCreate(['nim' => $m['nim']], $m);
        }
    }
}
