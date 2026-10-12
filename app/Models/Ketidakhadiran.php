<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ketidakhadiran extends Model
{
    protected $table = 'ketidakhadiran';

    protected $fillable = [
        'mahasiswa_id',
        'mata_kuliah_id',
        'jumlah',
    ];

    protected function casts(): array
    {
        return [
            'jumlah' => 'integer',
        ];
    }

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class);
    }

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class);
    }
}
