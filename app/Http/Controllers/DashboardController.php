<?php

namespace App\Http\Controllers;

use App\Models\MataKuliah;
use App\Models\Tugas;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $sekarang = now();
        $akhirMinggu = now()->addDays(7);

        // Tugas minggu ini (deadline antara sekarang s/d 7 hari ke depan)
        $tugasMingguIni = Tugas::with('mataKuliah')
            ->where('deadline', '>=', $sekarang)
            ->where('deadline', '<=', $akhirMinggu)
            ->orderBy('deadline')
            ->get();

        // Jadwal hari ini
        $hariIni = $this->namaHariIndonesia($sekarang->dayOfWeekIso);
        $jadwalHariIni = MataKuliah::where('hari', $hariIni)
            ->orderBy('jam')
            ->get();

        return Inertia::render('Dashboard', [
            'tugasMingguIni' => $tugasMingguIni,
            'jadwalHariIni' => $jadwalHariIni,
            'hariIni' => $hariIni,
        ]);
    }

    private function namaHariIndonesia(int $isoDay): string
    {
        return [
            1 => 'Senin',
            2 => 'Selasa',
            3 => 'Rabu',
            4 => 'Kamis',
            5 => 'Jumat',
            6 => 'Sabtu',
            7 => 'Minggu',
        ][$isoDay] ?? '';
    }
}
