<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    protected $table = 'mata_kuliah';

    protected $fillable = [
        'nama',
        'dosen',
        'hari',
        'jam',
        'tempat',
    ];

    public function tugas()
    {
        return $this->hasMany(Tugas::class);
    }

    public function referensi()
    {
        return $this->hasMany(Referensi::class);
    }
}
