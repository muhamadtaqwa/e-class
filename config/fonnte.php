<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Token API Fonnte
    |--------------------------------------------------------------------------
    |
    | Token untuk autentikasi ke API Fonnte. Diambil dari dashboard Fonnte
    | pada menu Device. Simpan di .env sebagai FONNTE_TOKEN.
    |
    */
    'token' => env('FONNTE_TOKEN'),

    /*
    |--------------------------------------------------------------------------
    | Group ID WhatsApp
    |--------------------------------------------------------------------------
    |
    | ID grup WA tujuan pengiriman reminder. Bentuknya seperti
    | "62812xxxx-123456@g.us". Simpan di .env sebagai FONNTE_GROUP_ID.
    |
    */
    'group_id' => env('FONNTE_GROUP_ID'),

    /*
    |--------------------------------------------------------------------------
    | URL Endpoint API Fonnte
    |--------------------------------------------------------------------------
    |
    | Endpoint untuk mengirim pesan. Jangan diubah kecuali Fonnte
    | mengubah struktur API-nya.
    |
    */
    'api_url' => 'https://api.fonnte.com/send',
];
