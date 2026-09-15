<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\MataKuliahController;
use App\Http\Controllers\ReferensiController;
use App\Http\Controllers\TugasController;
use App\Http\Controllers\TugasStatusController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tamu (belum login)
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

/*
|--------------------------------------------------------------------------
| Sudah login
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Mahasiswa
    Route::prefix('mahasiswa')->name('mahasiswa.')->group(function () {
        Route::get('/', [MahasiswaController::class, 'index'])->name('index');
        Route::post('/', [MahasiswaController::class, 'store'])->name('store');
        Route::put('/{mahasiswa}', [MahasiswaController::class, 'update'])->name('update');
        Route::delete('/{mahasiswa}', [MahasiswaController::class, 'destroy'])->name('destroy');
    });

    // Mata Kuliah
    Route::prefix('mata-kuliah')->name('mata-kuliah.')->group(function () {
        Route::get('/', [MataKuliahController::class, 'index'])->name('index');
        Route::post('/', [MataKuliahController::class, 'store'])->name('store');
        Route::put('/{mataKuliah}', [MataKuliahController::class, 'update'])->name('update');
        Route::delete('/{mataKuliah}', [MataKuliahController::class, 'destroy'])->name('destroy');
    });

    // Tugas
    Route::prefix('tugas')->name('tugas.')->group(function () {
        Route::get('/', [TugasController::class, 'index'])->name('index');
        Route::post('/', [TugasController::class, 'store'])->name('store');
        Route::put('/{tugas}', [TugasController::class, 'update'])->name('update');
        Route::delete('/{tugas}', [TugasController::class, 'destroy'])->name('destroy');

        // Tugas Status
        Route::get('/{tugas}/status', [TugasStatusController::class, 'index'])->name('status.index');
        Route::post('/{tugas}/status', [TugasStatusController::class, 'toggle'])->name('status.toggle');
    });

    // Referensi
    Route::prefix('referensi')->name('referensi.')->group(function () {
        Route::get('/', [ReferensiController::class, 'index'])->name('index');
        Route::post('/', [ReferensiController::class, 'store'])->name('store');
        Route::put('/{referensi}', [ReferensiController::class, 'update'])->name('update');
        Route::delete('/{referensi}', [ReferensiController::class, 'destroy'])->name('destroy');
    });
});
