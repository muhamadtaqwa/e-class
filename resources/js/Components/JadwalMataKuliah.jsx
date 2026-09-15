import { Clock, MapPin, User } from "lucide-react";

export default function JadwalMataKuliah({ mataKuliah }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-sm transition">
            <div className="flex items-start gap-2">
                <div className="w-1 h-full min-h-[3rem] bg-gradient-to-b from-teal-400 to-teal-600 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
                        {mataKuliah.nama}
                    </h3>

                    <div className="space-y-1.5 mt-2 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                            <span>{mataKuliah.jam?.slice(0, 5)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="truncate">{mataKuliah.dosen}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="truncate">
                                {mataKuliah.tempat}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
