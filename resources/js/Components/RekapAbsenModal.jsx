import { router } from "@inertiajs/react";
import {
    X,
    Minus,
    Plus,
    BookOpen,
    AlertTriangle,
    AlertCircle,
    CheckCircle2,
    CalendarX,
} from "lucide-react";

function getStatusInfo(jumlah) {
    if (jumlah === 0) {
        return {
            label: "Hadir penuh",
            badgeCls:
                "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
            barCls: "bg-emerald-500",
            icon: CheckCircle2,
        };
    }
    if (jumlah <= 2) {
        return {
            label: `Aman (sisa ${4 - jumlah}x)`,
            badgeCls:
                "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
            barCls: "bg-teal-500",
            icon: CheckCircle2,
        };
    }
    if (jumlah === 3) {
        return {
            label: "Waspada! Sisa 1x lagi",
            badgeCls:
                "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold animate-pulse",
            barCls: "bg-amber-500",
            icon: AlertTriangle,
        };
    }
    return {
        label: jumlah === 4 ? "Batas maksimal (4/4)!" : "Melewati batas!",
        badgeCls:
            "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800 font-bold",
        barCls: "bg-red-600",
        icon: AlertCircle,
    };
}

export default function RekapAbsenModal({
    mahasiswa,
    mataKuliah = [],
    onClose,
}) {
    if (!mahasiswa) return null;

    // Mapping mata_kuliah_id => jumlah
    const absenMap = (mahasiswa.ketidakhadiran ?? []).reduce((acc, curr) => {
        acc[curr.mata_kuliah_id] = curr.jumlah;
        return acc;
    }, {});

    const updateJumlah = (mataKuliahId, newJumlah) => {
        if (newJumlah < 0) return;

        router.post(
            "/ketidakhadiran",
            {
                mahasiswa_id: mahasiswa.id,
                mata_kuliah_id: mataKuliahId,
                jumlah: newJumlah,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const totalTidakHadir = Object.values(absenMap).reduce(
        (sum, val) => sum + (val || 0),
        0,
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-700 dark:text-teal-400 shrink-0">
                            <CalendarX className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                                Rekap Ketidakhadiran
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {mahasiswa.nama} · NIM: {mahasiswa.nim || "-"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition shrink-0"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sub-header info batas */}
                <div className="px-6 py-2.5 bg-teal-50 dark:bg-teal-950/40 border-b border-teal-100 dark:border-teal-900/60 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
                    <span>
                        Maksimal tidak hadir per mata kuliah:{" "}
                        <strong className="font-semibold">4 kali</strong>
                    </span>
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                        Total Absen:{" "}
                        <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                            {totalTidakHadir}x
                        </strong>
                    </span>
                </div>

                {/* Body / List Mata Kuliah */}
                <div className="p-6 overflow-y-auto space-y-3 flex-1">
                    {mataKuliah.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
                            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            Belum ada mata kuliah yang terdaftar.
                        </div>
                    ) : (
                        mataKuliah.map((mk) => {
                            const jumlah = absenMap[mk.id] ?? 0;
                            const status = getStatusInfo(jumlah);
                            const StatusIcon = status.icon;

                            return (
                                <div
                                    key={mk.id}
                                    className={`p-3.5 rounded-xl border transition ${
                                        jumlah >= 4
                                            ? "bg-red-50/60 dark:bg-red-950/30 border-red-200 dark:border-red-900/80"
                                            : jumlah === 3
                                              ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/80"
                                              : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-700/80"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug truncate">
                                                {mk.nama}
                                            </h3>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                                {mk.dosen}
                                            </p>
                                        </div>

                                        {/* Counter Controller */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateJumlah(
                                                        mk.id,
                                                        jumlah - 1,
                                                    )
                                                }
                                                disabled={jumlah <= 0}
                                                className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition active:scale-95"
                                                title="Kurangi 1"
                                                aria-label="Kurang"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>

                                            <div className="w-14 text-center">
                                                <span
                                                    className={`text-sm font-bold tabular-nums ${
                                                        jumlah >= 4
                                                            ? "text-red-600 dark:text-red-400"
                                                            : jumlah === 3
                                                              ? "text-amber-600 dark:text-amber-400"
                                                              : "text-slate-800 dark:text-slate-100"
                                                    }`}
                                                >
                                                    {jumlah}
                                                </span>
                                                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                                    {" "}
                                                    / 4
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateJumlah(
                                                        mk.id,
                                                        jumlah + 1,
                                                    )
                                                }
                                                className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition active:scale-95 shadow-sm"
                                                title="Tambah 1"
                                                aria-label="Tambah"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bar visual 4 slot kuota absen */}
                                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                                        {/* 4 dots/segments */}
                                        <div className="flex items-center gap-1.5">
                                            {[1, 2, 3, 4].map((slot) => {
                                                const filled = slot <= jumlah;
                                                return (
                                                    <div
                                                        key={slot}
                                                        className={`h-2 w-5 rounded-full transition-colors ${
                                                            filled
                                                                ? jumlah >= 4
                                                                    ? "bg-red-500"
                                                                    : jumlah ===
                                                                        3
                                                                      ? "bg-amber-500"
                                                                      : "bg-teal-500"
                                                                : "bg-slate-200 dark:bg-slate-700"
                                                        }`}
                                                        title={`Slot tidak hadir ke-${slot}`}
                                                    />
                                                );
                                            })}
                                        </div>

                                        {/* Status Chip */}
                                        <div
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] border ${status.badgeCls}`}
                                        >
                                            <StatusIcon className="w-3 h-3 shrink-0" />
                                            <span>{status.label}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/50 flex items-center justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-medium transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
