<?php

namespace App\Http\Controllers;

use App\Models\Ketidakhadiran;
use Illuminate\Http\Request;

class KetidakhadiranController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'mahasiswa_id' => ['required', 'exists:mahasiswa,id'],
            'mata_kuliah_id' => ['required', 'exists:mata_kuliah,id'],
            'jumlah' => ['required', 'integer', 'min:0'],
        ]);

        if ($validated['jumlah'] === 0) {
            Ketidakhadiran::where('mahasiswa_id', $validated['mahasiswa_id'])
                ->where('mata_kuliah_id', $validated['mata_kuliah_id'])
                ->delete();
        } else {
            Ketidakhadiran::updateOrCreate(
                [
                    'mahasiswa_id' => $validated['mahasiswa_id'],
                    'mata_kuliah_id' => $validated['mata_kuliah_id'],
                ],
                [
                    'jumlah' => $validated['jumlah'],
                ]
            );
        }

        return redirect()->back();
    }
}
