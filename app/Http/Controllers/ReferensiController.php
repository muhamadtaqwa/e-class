<?php

namespace App\Http\Controllers;

use App\Models\MataKuliah;
use App\Models\Referensi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferensiController extends Controller
{
    public function index(Request $request)
    {
        $query = Referensi::with('mataKuliah');

        // Filter jenis
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        // Filter mata kuliah
        if ($request->filled('mata_kuliah_id')) {
            $query->where('mata_kuliah_id', $request->mata_kuliah_id);
        }

        // Pencarian judul / penulis
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('penulis', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Referensi/Index', [
            'referensi' => $query->orderBy('judul')->get(),
            'mataKuliah' => MataKuliah::orderBy('nama')->get(),
            'filters' => $request->only(['jenis', 'mata_kuliah_id', 'search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mata_kuliah_id' => ['required', 'exists:mata_kuliah,id'],
            'judul' => ['required', 'string', 'max:255'],
            'penulis' => ['required', 'string', 'max:255'],
            'tahun' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'jenis' => ['required', 'in:buku,jurnal'],
            'link' => ['nullable', 'url', 'max:500'],
        ]);

        Referensi::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Referensi $referensi)
    {
        $validated = $request->validate([
            'mata_kuliah_id' => ['required', 'exists:mata_kuliah,id'],
            'judul' => ['required', 'string', 'max:255'],
            'penulis' => ['required', 'string', 'max:255'],
            'tahun' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'jenis' => ['required', 'in:buku,jurnal'],
            'link' => ['nullable', 'url', 'max:500'],
        ]);

        $referensi->update($validated);

        return redirect()->back();
    }

    public function destroy(Referensi $referensi)
    {
        $referensi->delete();

        return redirect()->back();
    }
}
