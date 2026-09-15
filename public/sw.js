// Service worker minimal untuk PWA E-Class
// Tujuan: memenuhi syarat PWA "installable"
// Tidak ada caching offline (sesuai kebutuhan PWA minimal)

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    // Biarkan semua request lewat (tidak di-cache)
    return;
});
