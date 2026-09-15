<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index()
    {
        return Inertia::render('Mahasiswa/Index', [
            'mahasiswa' => Mahasiswa::orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nim' => ['required', 'string', 'max:50', 'unique:mahasiswa,nim'],
            'nama' => ['required', 'string', 'max:255'],
            'no_wa' => ['nullable', 'string', 'max:30'],
        ]);

        Mahasiswa::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Mahasiswa $mahasiswa)
    {
        $validated = $request->validate([
            'nim' => ['required', 'string', 'max:50', 'unique:mahasiswa,nim,' . $mahasiswa->id],
            'nama' => ['required', 'string', 'max:255'],
            'no_wa' => ['nullable', 'string', 'max:30'],
        ]);

        $mahasiswa->update($validated);

        return redirect()->back();
    }

    public function destroy(Mahasiswa $mahasiswa)
    {
        $mahasiswa->delete();

        return redirect()->back();
    }
}
