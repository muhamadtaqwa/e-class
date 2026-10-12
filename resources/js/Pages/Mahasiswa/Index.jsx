import { useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import Form from "./Form";
import RekapAbsenModal from "../../Components/RekapAbsenModal";
import {
    Plus,
    Pencil,
    Trash2,
    Users,
    Copy,
    Check,
    CalendarX,
} from "lucide-react";
import toast from "react-hot-toast";

function getInisial(nama) {
    return nama
        .split(" ")
        .slice(0, 2)
        .map((kata) => kata[0])
        .join("")
        .toUpperCase();
}

function Index({ mahasiswa, mataKuliah = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [copied, setCopied] = useState(null);
    const [absenMahasiswa, setAbsenMahasiswa] = useState(null);

    const activeAbsenMahasiswa = mahasiswa.find(
        (m) => m.id === absenMahasiswa?.id,
    );

    const openTambah = () => {
        setEditData(null);
        setShowForm(true);
    };

    const openEdit = (item) => {
        setEditData(item);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditData(null);
    };

    const handleDelete = (item) => {
        if (confirm(`Hapus mahasiswa "${item.nama}"?`)) {
            router.delete(`/mahasiswa/${item.id}`, {
                onSuccess: () => toast.success("Mahasiswa berhasil dihapus"),
                onError: () => toast.error("Gagal menghapus mahasiswa"),
            });
        }
    };

    const handleCopy = async (teks, key) => {
        try {
            await navigator.clipboard.writeText(teks);
            setCopied(key);
            setTimeout(() => setCopied(null), 1500);
        } catch {
            toast.error("Gagal menyalin");
        }
    };

    const isEmpty = mahasiswa.length === 0;

    const dataUrut = [...mahasiswa].sort((a, b) =>
        (a.nim || "").localeCompare(b.nim || "", undefined, { numeric: true }),
    );

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                        Data Mahasiswa
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {mahasiswa.length} mahasiswa terdaftar
                    </p>
                </div>
                <button
                    onClick={openTambah}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white text-sm font-medium rounded-lg transition shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Tambah</span>
                </button>
            </div>

            {isEmpty ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Belum ada data mahasiswa.
                    </p>
                    <button
                        onClick={openTambah}
                        className="mt-4 text-sm text-teal-700 dark:text-teal-400 font-medium hover:underline"
                    >
                        Tambah mahasiswa pertama
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                    {dataUrut.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-3 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md transition"
                        >
                            {/* Header card */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shrink-0 shadow-sm shadow-teal-600/20">
                                    <span className="text-white text-xs font-semibold">
                                        {getInisial(item.nama)}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                                        {item.nama}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => setAbsenMahasiswa(item)}
                                        className="p-1.5 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950 text-teal-600 dark:text-teal-400 transition"
                                        aria-label="Rekap Absen"
                                        title="Rekap Absen"
                                    >
                                        <CalendarX className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
                                        aria-label="Edit"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500 dark:text-red-400 transition"
                                        aria-label="Hapus"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="space-y-1 border-t border-slate-100 dark:border-slate-700 pt-2">
                                {[
                                    {
                                        label: "NIM",
                                        value: item.nim,
                                        copyKey: `nim-${item.id}`,
                                    },
                                    {
                                        label: "WhatsApp",
                                        value: item.no_wa,
                                        copyKey: `wa-${item.id}`,
                                    },
                                ].map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex items-center justify-between gap-2"
                                    >
                                        <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
                                            {row.label}
                                        </span>
                                        <div className="flex items-center gap-1 min-w-0">
                                            <span className="text-xs text-slate-700 dark:text-slate-300 truncate">
                                                {row.value || "-"}
                                            </span>
                                            {row.value && (
                                                <button
                                                    onClick={() =>
                                                        handleCopy(
                                                            row.value,
                                                            row.copyKey,
                                                        )
                                                    }
                                                    className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950 transition shrink-0"
                                                    aria-label={`Copy ${row.label}`}
                                                    title={`Copy ${row.label}`}
                                                >
                                                    {copied === row.copyKey ? (
                                                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Rekap Absen Mini-Bar */}
                            {(() => {
                                const list = item.ketidakhadiran ?? [];
                                const totalAbsen = list.reduce(
                                    (sum, k) => sum + (k.jumlah || 0),
                                    0,
                                );
                                const matkulBatas = list.filter(
                                    (k) => k.jumlah >= 4,
                                );
                                const matkulWaspada = list.filter(
                                    (k) => k.jumlah === 3,
                                );

                                return (
                                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-1 text-[11px]">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAbsenMahasiswa(item)
                                            }
                                            className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
                                        >
                                            <CalendarX className="w-3.5 h-3.5 shrink-0" />
                                            <span>Rekap Absen</span>
                                        </button>

                                        {matkulBatas.length > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setAbsenMahasiswa(item)
                                                }
                                                className="px-2 py-0.5 rounded-md font-semibold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 transition hover:scale-105"
                                            >
                                                {matkulBatas.length} MatKul Batas Habis!
                                            </button>
                                        ) : matkulWaspada.length > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setAbsenMahasiswa(item)
                                                }
                                                className="px-2 py-0.5 rounded-md font-semibold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition hover:scale-105"
                                            >
                                                {matkulWaspada.length} MatKul Sisa 1x
                                            </button>
                                        ) : totalAbsen > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setAbsenMahasiswa(item)
                                                }
                                                className="px-2 py-0.5 rounded-md font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition"
                                            >
                                                Total Absen: {totalAbsen}x
                                            </button>
                                        ) : (
                                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40">
                                                Hadir Penuh
                                            </span>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    ))}
                </div>
            )}

            {showForm && <Form mahasiswa={editData} onClose={closeForm} />}

            {activeAbsenMahasiswa && (
                <RekapAbsenModal
                    mahasiswa={activeAbsenMahasiswa}
                    mataKuliah={mataKuliah}
                    onClose={() => setAbsenMahasiswa(null)}
                />
            )}
        </>
    );
}

Index.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Index;
