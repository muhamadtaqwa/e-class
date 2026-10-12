<?php

namespace App\Http\Controllers;

use App\Models\LinkTugas;
use Illuminate\Http\Request;

class LinkTugasController extends Controller
{
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
