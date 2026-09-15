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
            'mataKuliah' => MataKuliah::with(['tugas' => function ($q) {
                $q->orderBy('deadline');
            }])->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mata_kuliah_id' => ['required', 'exists:mata_kuliah,id'],
            'judul' => ['required', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],
            'deadline' => ['required', 'date'],
        ]);

        Tugas::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Tugas $tugas)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],
            'deadline' => ['required', 'date'],
        ]);

        $tugas->update($validated);

        return redirect()->back();
    }

    public function destroy(Tugas $tugas)
    {
        $tugas->delete();

        return redirect()->back();
    }
}
