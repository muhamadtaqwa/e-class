<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TugasStatus extends Model
{
    protected $table = 'tugas_status';

    protected $fillable = [
        'tugas_id',
        'mahasiswa_id',
        'status',
    ];

    public function tugas()
    {
        return $this->belongsTo(Tugas::class);
    }

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class);
    }
}
