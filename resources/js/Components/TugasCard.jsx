import { Calendar, BookOpen } from "lucide-react";

export default function TugasCard({ tugas }) {
    const deadline = new Date(tugas.deadline);
    const sekarang = new Date();
    const selisihHari = Math.ceil(
        (deadline - sekarang) / (1000 * 60 * 60 * 24),
    );

    const formatDeadline = () => {
        const tanggal = deadline.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        });
        const jam = deadline.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${tanggal}, ${jam}`;
    };

    // Warna berdasarkan kedekatan deadline
    const getWarna = () => {
        if (selisihHari <= 1)
            return "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-700 dark:text-red-300";
        if (selisihHari <= 3)
            return "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300";
        return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200";
    };

    const getBadgeWarna = () => {
        if (selisihHari <= 1)
            return "bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300";
        if (selisihHari <= 3)
            return "bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300";
        return "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400";
    };

    const getLabel = () => {
        if (selisihHari <= 0) return "Hari ini";
        if (selisihHari === 1) return "Besok";
        return `${selisihHari} hari lagi`;
    };

    return (
        <div className={`rounded-lg border p-3 ${getWarna()} transition`}>
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium leading-snug flex-1">
                    {tugas.judul}
                </h3>
                <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 ${getBadgeWarna()}`}
                >
                    {getLabel()}
                </span>
            </div>

            <div className="flex items-center gap-1.5 mt-2 text-xs opacity-80">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="truncate">{tugas.mata_kuliah?.nama}</span>
            </div>

            <div className="flex items-center gap-1.5 mt-1 text-xs opacity-80">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDeadline()}</span>
            </div>
        </div>
    );
}
