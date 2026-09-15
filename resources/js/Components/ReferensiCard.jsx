import { Pencil, Trash2, ExternalLink, Book, FileText } from "lucide-react";

export default function ReferensiCard({ item, onEdit, onDelete }) {
    const isBuku = item.jenis === "buku";
    const Icon = isBuku ? Book : FileText;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md transition flex flex-col">
            {/* Header: ikon + judul + badge + aksi */}
            <div className="flex items-start gap-3 mb-3">
                <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isBuku
                            ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                            : "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                    }`}
                >
                    <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                        <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug flex-1">
                            {item.judul}
                        </h3>
                        <span
                            className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                                isBuku
                                    ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                                    : "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                            }`}
                        >
                            {item.jenis.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
                        aria-label="Edit"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(item)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500 dark:text-red-400 transition"
                        aria-label="Hapus"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Body: label-value */}
            <div className="space-y-2 text-sm border-t border-slate-100 dark:border-slate-700 pt-3">
                <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">
                        Penulis
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 text-right">
                        {item.penulis}
                    </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">
                        Tahun
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 text-right font-mono">
                        {item.tahun}
                    </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 pt-0.5">
                        Mata Kuliah
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 text-right">
                        {item.mata_kuliah?.nama ?? "-"}
                    </span>
                </div>

                {item.link && (
                    <div className="flex items-center justify-between gap-3 pt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
                            Link
                        </span>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Buka link
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
