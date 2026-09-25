<?php

namespace App\Http\Controllers;

use App\Models\MataKuliah;
use App\Models\Tugas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TugasController extends Controller
{
    public function index()
    {
        return Inertia::render('Tugas/Index', [
            'mataKuliah' => MataKuliah::with([
                'tugas' => function ($q) {
                    $q->with('mahasiswa')->orderBy('deadline');
                },
            ])->get(),
            'mahasiswa' => \App\Models\Mahasiswa::orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mata_kuliah_id' => ['required', 'exists:mata_kuliah,id'],
            'judul' => ['required', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],
            'deadline' => ['required', 'date'],
            'mahasiswa_ids' => ['required', 'array', 'min:1'],
            'mahasiswa_ids.*' => ['exists:mahasiswa,id'],
        ]);

        $tugas = Tugas::create([
            'mata_kuliah_id' => $validated['mata_kuliah_id'],
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'deadline' => $validated['deadline'],
        ]);

        $tugas->mahasiswa()->sync($validated['mahasiswa_ids']);

        return redirect()->back();
    }

    public function update(Request $request, Tugas $tugas)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],
            'deadline' => ['required', 'date'],
            'mahasiswa_ids' => ['required', 'array', 'min:1'],
            'mahasiswa_ids.*' => ['exists:mahasiswa,id'],
        ]);

        $tugas->update([
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'deadline' => $validated['deadline'],
        ]);

        $tugas->mahasiswa()->sync($validated['mahasiswa_ids']);

        return redirect()->back();
    }

    public function destroy(Tugas $tugas)
    {
        $tugas->delete();

        return redirect()->back();
    }
}
