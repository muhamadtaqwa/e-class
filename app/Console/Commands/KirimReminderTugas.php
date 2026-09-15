<?php

namespace App\Console\Commands;

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

        $tugas = Tugas::with('mataKuliah')
            ->whereDate('deadline', $besok->toDateString())
            ->orderBy('deadline')
            ->get();

        if ($tugas->isEmpty()) {
            $this->info('Tidak ada tugas yang deadline-nya besok.');
            return;
        }

        $pesan = "⏰ *Reminder Tugas*\n\n";
        $pesan .= "Deadline *besok* ({$besok->translatedFormat('l, d F Y')}):\n\n";

        foreach ($tugas as $t) {
            $jam = \Carbon\Carbon::parse($t->deadline)->format('H:i');
            $pesan .= "• *{$t->judul}*\n";
            $pesan .= "  {$t->mataKuliah->nama} · {$jam}\n\n";
        }

        $pesan .= "Jangan lupa dikerjakan ya!";

        $fonnte->kirimKeGrup($pesan);

        $this->info("Reminder terkirim untuk {$tugas->count()} tugas.");
    }
}
