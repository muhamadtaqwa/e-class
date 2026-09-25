<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkTugas extends Model
{
    protected $table = 'link_tugas';

    protected $fillable = [
        'mata_kuliah_id',
        'judul',
        'link',
    ];

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class);
    }
}
