<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FonnteService
{
    protected string $token;
    protected string $group_id;
    protected string $api_url;

    public function __construct()
    {
        $this->token = config('fonnte.token');
        $this->group_id = config('fonnte.group_id');
        $this->api_url = config('fonnte.api_url');
    }

    /**
     * Kirim pesan ke grup WA kelas.
     */
    public function kirimKeGrup(string $pesan): bool
    {
        return $this->kirim($this->group_id, $pesan);
    }

    /**
     * Kirim pesan ke nomor WA tertentu (untuk uji coba).
     */
    public function kirimKeNomor(string $nomor, string $pesan): bool
    {
        return $this->kirim($nomor, $pesan);
    }

    /**
     * Kirim pesan ke target (nomor atau group ID).
     */
    protected function kirim(string $target, string $pesan): bool
    {
        if (empty($this->token)) {
            Log::error('Fonnte: token kosong. Cek FONNTE_TOKEN di .env');
            return false;
        }

        if (empty($target)) {
            Log::error('Fonnte: target kosong (group_id / nomor)');
            return false;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => $this->token,
            ])->asForm()->post($this->api_url, [
                'target' => $target,
                'message' => $pesan,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (($data['status'] ?? false) === true) {
                    Log::info("Fonnte: pesan berhasil dikirim ke {$target}");
                    return true;
                }

                Log::warning('Fonnte: API merespons tapi status false', [
                    'response' => $data,
                ]);
                return false;
            }

            Log::error('Fonnte: HTTP error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return false;
        } catch (\Exception $e) {
            Log::error('Fonnte: exception', [
                'message' => $e->getMessage(),
            ]);
            return false;
        }
    }
}
