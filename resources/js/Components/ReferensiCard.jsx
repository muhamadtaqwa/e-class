import { Pencil, Trash2, ExternalLink, Book, FileText } from "lucide-react";

export default function ReferensiCard({ item, onEdit, onDelete }) {
    const isBuku = item.jenis === "buku";
    const Icon = isBuku ? Book : FileText;

    return (
        <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-3 pl-4 overflow-hidden hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md transition flex flex-col">
            {/* Garis aksen teal di kiri */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-teal-600" />

            {/* Header */}
            <div className="flex items-start gap-2.5 mb-2">
                <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isBuku
                            ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                            : "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                    }`}
                    title={isBuku ? "Buku" : "Jurnal"}
                >
                    <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
                        {item.judul}
                    </h3>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                    <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
                        aria-label="Edit"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => onDelete(item)}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950 text-red-500 dark:text-red-400 transition"
                        aria-label="Hapus"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Body: label-value */}
            <div className="space-y-1 text-sm border-t border-slate-100 dark:border-slate-700 pt-2">
                {[
                    { label: "Penulis", value: item.penulis },
                    { label: "Tahun", value: item.tahun },
                    {
                        label: "Mata Kuliah",
                        value: item.mata_kuliah?.nama ?? "-",
                    },
                ].map((row) => (
                    <div
                        key={row.label}
                        className="flex items-start justify-between gap-3"
                    >
                        <span className="text-xs text-teal-600 dark:text-teal-400 shrink-0 pt-0.5">
                            {row.label}
                        </span>
                        <span className="text-xs text-slate-700 dark:text-slate-300 text-right">
                            {row.value}
                        </span>
                    </div>
                ))}

                {item.link && (
                    <div className="flex items-center justify-between gap-3 pt-0.5">
                        <span className="text-xs text-teal-600 dark:text-teal-400 shrink-0">
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
