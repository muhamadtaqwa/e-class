<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\Tugas;
use App\Models\TugasStatus;
use Illuminate\Http\Request;

class TugasStatusController extends Controller
{
    public function index(Tugas $tugas)
    {
        // Ambil semua mahasiswa + status mereka untuk tugas ini
        $mahasiswa = Mahasiswa::orderBy('nama')->get()->map(function ($m) use ($tugas) {
            $status = TugasStatus::where('tugas_id', $tugas->id)
                ->where('mahasiswa_id', $m->id)
                ->first();

            return [
                'id' => $m->id,
                'nim' => $m->nim,
                'nama' => $m->nama,
                'status' => $status?->status ?? 'belum',
            ];
        });

        return response()->json([
            'tugas' => [
                'id' => $tugas->id,
                'judul' => $tugas->judul,
            ],
            'mahasiswa' => $mahasiswa,
        ]);
    }

    public function toggle(Request $request, Tugas $tugas)
    {
        $validated = $request->validate([
            'mahasiswa_id' => ['required', 'exists:mahasiswa,id'],
            'status' => ['required', 'in:selesai,belum'],
        ]);

        TugasStatus::updateOrCreate(
            [
                'tugas_id' => $tugas->id,
                'mahasiswa_id' => $validated['mahasiswa_id'],
            ],
            [
                'status' => $validated['status'],
            ]
        );

        return response()->json(['ok' => true]);
    }
}
