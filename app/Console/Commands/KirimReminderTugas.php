<?php

namespace App\Console\Commands;

use App\Models\Mahasiswa;
use App\Models\Tugas;
use App\Services\FonnteService;
use Illuminate\Console\Command;

class KirimReminderTugas extends Command
{
    protected $signature = 'tugas:reminder';
    protected $description = 'Kirim reminder H-1 deadline tugas ke grup WA kelas';

    public function handle(FonnteService $fonnte): void
    {
        $besok = now()->addDay();

        $tugas = Tugas::with(['mataKuliah', 'mahasiswa'])
            ->whereDate('deadline', $besok->toDateString())
            ->orderBy('deadline')
            ->get();

        if ($tugas->isEmpty()) {
            $this->info('Tidak ada tugas yang deadline-nya besok.');
            return;
        }

        $totalMahasiswa = Mahasiswa::count();

        $pesan = "🔔 *PENGINGAT TUGAS — BESOK*\n\n";
        $pesan .= "━━━━━━━━━━━━━━━━━━\n\n";

        foreach ($tugas as $t) {
            $deadline = \Carbon\Carbon::parse($t->deadline);
            $hari = $deadline->translatedFormat('l');
            $tanggal = $deadline->translatedFormat('d M');

            $pesan .= "📚 *{$t->mataKuliah->nama}*\n";
            $pesan .= "📝 {$t->judul}\n";
            $pesan .= "⏰ {$hari}, {$tanggal}\n";

            // Kalau tugas untuk sebagian mahasiswa (bukan semua), tampilkan nama
            $jumlahPeserta = $t->mahasiswa->count();
            if ($jumlahPeserta > 0 && $jumlahPeserta < $totalMahasiswa) {
                $namaMhs = $t->mahasiswa->pluck('nama');
                $tampil = $namaMhs->take(3)->implode(', ');
                $sisa = $namaMhs->count() - 3;
                if ($sisa > 0) {
                    $tampil .= " +{$sisa} lainnya";
                }
                $pesan .= "👥 {$tampil}\n";
            }

            $pesan .= "\n━━━━━━━━━━━━━━━━━━\n\n";
        }

        $pesan .= "Jangan lupa dikerjakan! 💪";

        $fonnte->kirimKeGrup($pesan);

        $this->info("Reminder terkirim untuk {$tugas->count()} tugas.");
    }
}
