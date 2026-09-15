import { useState, useEffect } from "react";
import { X, Check, Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TugasStatusModal({ tugas, onClose }) {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);

    useEffect(() => {
        fetch(`/tugas/${tugas.id}/status`, {
            headers: { Accept: "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setMahasiswa(data.mahasiswa);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Gagal memuat data mahasiswa");
                setLoading(false);
            });
    }, [tugas.id]);

    const handleToggle = (m) => {
        const statusBaru = m.status === "selesai" ? "belum" : "selesai";

        setMahasiswa((prev) =>
            prev.map((x) => (x.id === m.id ? { ...x, status: statusBaru } : x)),
        );
        setSavingId(m.id);

        fetch(`/tugas/${tugas.id}/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content"),
            },
            body: JSON.stringify({
                mahasiswa_id: m.id,
                status: statusBaru,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                setSavingId(null);
            })
            .catch(() => {
                setMahasiswa((prev) =>
                    prev.map((x) =>
                        x.id === m.id ? { ...x, status: m.status } : x,
                    ),
                );
                toast.error("Gagal menyimpan status");
                setSavingId(null);
            });
    };

    const jumlahSelesai = mahasiswa.filter(
        (m) => m.status === "selesai",
    ).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                            Status Mahasiswa
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                            {tugas.judul}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition shrink-0"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Ringkasan */}
                {!loading && mahasiswa.length > 0 && (
                    <div className="px-5 py-2.5 bg-teal-50 dark:bg-teal-950 border-b border-teal-100 dark:border-teal-900 text-xs text-teal-700 dark:text-teal-400">
                        <span className="font-semibold">{jumlahSelesai}</span>{" "}
                        dari {mahasiswa.length} mahasiswa selesai
                    </div>
                )}

                {/* Daftar Mahasiswa */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-6 h-6 text-teal-600 dark:text-teal-400 animate-spin" />
                        </div>
                    ) : mahasiswa.length === 0 ? (
                        <div className="text-center py-12 px-5">
                            <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Belum ada data mahasiswa.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {mahasiswa.map((m) => {
                                const selesai = m.status === "selesai";
                                const saving = savingId === m.id;

                                return (
                                    <button
                                        key={m.id}
                                        onClick={() => handleToggle(m)}
                                        disabled={saving}
                                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition text-left disabled:opacity-60"
                                    >
                                        <div
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                                                selesai
                                                    ? "bg-teal-600 border-teal-600 dark:bg-teal-500 dark:border-teal-500"
                                                    : "border-slate-300 dark:border-slate-600"
                                            }`}
                                        >
                                            {selesai && (
                                                <Check
                                                    className="w-3.5 h-3.5 text-white"
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm ${
                                                    selesai
                                                        ? "text-slate-400 dark:text-slate-500 line-through"
                                                        : "text-slate-800 dark:text-slate-100"
                                                }`}
                                            >
                                                {m.nama}
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                                                {m.nim}
                                            </p>
                                        </div>

                                        {saving && (
                                            <Loader2 className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-spin shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
