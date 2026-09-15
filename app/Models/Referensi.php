<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Referensi extends Model
{
    protected $table = 'referensi';

    protected $fillable = [
        'mata_kuliah_id',
        'judul',
        'penulis',
        'tahun',
        'jenis',
        'link',
    ];

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class);
    }
}
