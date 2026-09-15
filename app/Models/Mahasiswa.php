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

    public function tugasStatus()
    {
        return $this->hasMany(TugasStatus::class);
    }
}
