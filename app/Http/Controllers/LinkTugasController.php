<?php

namespace App\Http\Controllers;

use App\Models\LinkTugas;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LinkTugasController extends Controller
{
    public function index()
    {
        return Inertia::render('LinkTugas/Index', [
            'mataKuliah' => MataKuliah::with('linkTugas')
                ->orderBy('nama')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mata_kuliah_id' => ['required', 'exists:mata_kuliah,id'],
            'judul' => ['required', 'string', 'max:255'],
            'link' => ['required', 'url', 'max:500'],
        ]);

        LinkTugas::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, LinkTugas $linkTugas)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'link' => ['required', 'url', 'max:500'],
        ]);

        $linkTugas->update($validated);

        return redirect()->back();
    }

    public function destroy(LinkTugas $linkTugas)
    {
        $linkTugas->delete();

        return redirect()->back();
    }
}
