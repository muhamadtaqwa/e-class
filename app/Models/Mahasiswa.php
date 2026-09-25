<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    protected $table = 'mahasiswa';

    protected $fillable = [
        'nim',
        'nama',
        'no_wa',
    ];

    public function tugas()
    {
        return $this->belongsToMany(
            Tugas::class,
            'tugas_mahasiswa',
            'mahasiswa_id',
            'tugas_id'
        );
    }
}
