import { useState, useEffect } from "react";
import AppLayout from "../Layouts/AppLayout";
import TugasCard from "../Components/TugasCard";
import JadwalMataKuliah from "../Components/JadwalMataKuliah";
import {
    ClipboardList,
    CalendarDays,
    Inbox,
    GraduationCap,
} from "lucide-react";

function getUcapan(jam) {
    if (jam >= 4 && jam < 11) return "Selamat pagi";
    if (jam >= 11 && jam < 15) return "Selamat siang";
    if (jam >= 15 && jam < 18) return "Selamat sore";
    return "Selamat malam";
}

function formatTanggalMasehi(date) {
    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatTanggalHijriah(date) {
    try {
        return new Intl.DateTimeFormat("id-ID-u-ca-islamic", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    } catch (e) {
        return "";
    }
}

export default function Dashboard({ tugasMingguIni, jadwalHariIni, hariIni }) {
    const [sekarang, setSekarang] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setSekarang(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const jam = sekarang.getHours();
    const menit = String(sekarang.getMinutes()).padStart(2, "0");
    const detik = String(sekarang.getSeconds()).padStart(2, "0");
    const waktuStr = `${String(jam).padStart(2, "0")}:${menit}:${detik}`;

    const ucapan = getUcapan(jam);
    const tanggalMasehi = formatTanggalMasehi(sekarang);
    const tanggalHijriah = formatTanggalHijriah(sekarang);

    return (
        <AppLayout>
            {/* Header Ucapan & Waktu */}
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-700 to-teal-500 rounded-2xl p-6 mb-6 shadow-lg shadow-teal-600/20">
                {/* Dekorasi ikon transparan */}
                <GraduationCap
                    className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12 pointer-events-none"
                    strokeWidth={1.5}
                />

                <div className="relative">
                    <p className="text-teal-50 text-sm font-medium">
                        {ucapan}, Orang Sukses
                    </p>
                    <p className="text-3xl font-semibold text-white tabular-nums tracking-tight mt-2">
                        {waktuStr}
                    </p>
                    <div className="mt-2 text-teal-50/90 text-sm leading-relaxed">
                        <p>{tanggalMasehi}</p>
                        {tanggalHijriah && (
                            <p className="text-teal-100/70">{tanggalHijriah}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Jadwal Hari Ini */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950 flex items-center justify-center">
                            <CalendarDays className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Jadwal Hari Ini
                        </h2>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                            ({hariIni})
                        </span>
                    </div>

                    {jadwalHariIni.length === 0 ? (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
                            <Inbox className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Tidak ada jadwal kuliah hari ini
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {jadwalHariIni.map((mk) => (
                                <JadwalMataKuliah key={mk.id} mataKuliah={mk} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Tugas Minggu Ini */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950 flex items-center justify-center">
                            <ClipboardList className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Tugas Minggu Ini
                        </h2>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                            ({tugasMingguIni.length})
                        </span>
                    </div>

                    {tugasMingguIni.length === 0 ? (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
                            <Inbox className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Tidak ada tugas minggu ini
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {tugasMingguIni.map((tugas) => (
                                <TugasCard key={tugas.id} tugas={tugas} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
