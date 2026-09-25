<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tugas extends Model
{
    protected $table = 'tugas';

    protected $fillable = [
        'mata_kuliah_id',
        'judul',
        'deskripsi',
        'deadline',
    ];

    protected function casts(): array
    {
        return [
            'deadline' => 'datetime',
        ];
    }

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class);
    }

    public function mahasiswa()
    {
        return $this->belongsToMany(
            Mahasiswa::class,
            'tugas_mahasiswa',
            'tugas_id',
            'mahasiswa_id'
        );
    }
}
