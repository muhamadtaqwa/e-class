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
        $hariIniTanggal = $sekarang->toDateString();
        $akhirMinggu = $sekarang->copy()->addDays(7)->toDateString();

        // Tugas minggu ini (deadline antara hari ini s/d 7 hari ke depan)
        $tugasMingguIni = Tugas::with('mataKuliah')
            ->whereDate('deadline', '>=', $hariIniTanggal)
            ->whereDate('deadline', '<=', $akhirMinggu)
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
