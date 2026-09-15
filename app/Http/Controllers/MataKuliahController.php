<?php

namespace App\Http\Controllers;

use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MataKuliahController extends Controller
{
    public function index()
    {
        return Inertia::render('MataKuliah/Index', [
            'mataKuliah' => MataKuliah::orderBy('hari')->orderBy('jam')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'dosen' => ['required', 'string', 'max:255'],
            'hari' => ['required', 'string', 'max:20'],
            'jam' => ['required', 'date_format:H:i'],
            'tempat' => ['required', 'string', 'max:255'],
        ]);

        MataKuliah::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, MataKuliah $mataKuliah)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'dosen' => ['required', 'string', 'max:255'],
            'hari' => ['required', 'string', 'max:20'],
            'jam' => ['required', 'date_format:H:i'],
            'tempat' => ['required', 'string', 'max:255'],
        ]);

        $mataKuliah->update($validated);

        return redirect()->back();
    }

    public function destroy(MataKuliah $mataKuliah)
    {
        $mataKuliah->delete();

        return redirect()->back();
    }
}
