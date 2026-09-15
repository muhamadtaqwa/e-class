import { useState, useEffect } from "react";
import AppLayout from "../Layouts/AppLayout";
import TugasCard from "../Components/TugasCard";
import JadwalMataKuliah from "../Components/JadwalMataKuliah";
import {
    ClipboardList,
    CalendarDays,
    Inbox,
    GraduationCap,
    LayoutDashboard,
    BookOpen,
    Library,
    Users,
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

function Dashboard({ tugasMingguIni, jadwalHariIni, hariIni }) {
    const [sekarang, setSekarang] = useState(new Date());
    const [hijri, setHijri] = useState("");

    // Jam real-time
    useEffect(() => {
        const timer = setInterval(() => setSekarang(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Tanggal Hijriah dari API Aladhan
    useEffect(() => {
        const now = new Date();
        const today = `${String(now.getDate()).padStart(2, "0")}-${String(
            now.getMonth() + 1,
        ).padStart(2, "0")}-${now.getFullYear()}`;

        fetch(`https://api.aladhan.com/v1/gToH?date=${today}`)
            .then((res) => res.json())
            .then((data) => {
                const h = data?.data?.hijri;
                if (h) setHijri(`${h.day} ${h.month.en} ${h.year} H`);
            })
            .catch(() => setHijri(""));
    }, []);

    const jam = sekarang.getHours();
    const menit = String(sekarang.getMinutes()).padStart(2, "0");
    const detik = String(sekarang.getSeconds()).padStart(2, "0");
    const waktuStr = `${String(jam).padStart(2, "0")}:${menit}:${detik}`;

    const ucapan = getUcapan(jam);
    const tanggalMasehi = formatTanggalMasehi(sekarang);

    return (
        <>
            {/* Header Ucapan & Waktu */}
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-700 to-teal-500 rounded-2xl p-4 mb-4 shadow-lg shadow-teal-600/20">
                {/* Dekorasi kolase ikon — sudut kanan bawah */}
                <div className="absolute bottom-2 right-4 pointer-events-none">
                    <div className="relative w-32 h-20">
                        <GraduationCap
                            className="absolute bottom-0 right-0 w-16 h-16 text-white/[0.10]"
                            strokeWidth={1.2}
                        />
                        <BookOpen
                            className="absolute bottom-8 right-14 w-7 h-7 text-white/[0.08] -rotate-12"
                            strokeWidth={1.5}
                        />
                        <ClipboardList
                            className="absolute bottom-10 right-0 w-6 h-6 text-white/[0.07] rotate-6"
                            strokeWidth={1.5}
                        />
                        <Library
                            className="absolute bottom-1 right-16 w-5 h-5 text-white/[0.06] rotate-12"
                            strokeWidth={1.5}
                        />
                        <Users
                            className="absolute bottom-14 right-10 w-5 h-5 text-white/[0.06] -rotate-6"
                            strokeWidth={1.5}
                        />
                        <LayoutDashboard
                            className="absolute bottom-0 right-24 w-4 h-4 text-white/[0.05] rotate-6"
                            strokeWidth={1.5}
                        />
                    </div>
                </div>

                <div className="relative">
                    <p className="text-teal-50 text-sm font-medium">
                        {ucapan}, Orang Sukses
                    </p>
                    <p className="text-3xl font-semibold text-white tabular-nums tracking-tight mt-1.5">
                        {waktuStr}
                    </p>
                    <div className="mt-1.5 text-teal-50/90 text-sm leading-relaxed">
                        <p>{tanggalMasehi}</p>
                        {hijri && <p className="text-teal-100/70">{hijri}</p>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Jadwal Hari Ini */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
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
                    <div className="flex items-center gap-2 mb-2">
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
        </>
    );
}

Dashboard.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Dashboard;
