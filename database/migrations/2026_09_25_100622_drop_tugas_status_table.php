<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('tugas_status');
    }

    public function down(): void
    {
        // Tidak perlu rollback — tabel tugas_status sudah dihapus permanen
    }
};
