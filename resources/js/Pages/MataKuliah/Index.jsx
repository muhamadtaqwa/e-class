import { useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import Form from "./Form";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const urutanHari = {
    Senin: 1,
    Selasa: 2,
    Rabu: 3,
    Kamis: 4,
    Jumat: 5,
    Sabtu: 6,
    Minggu: 7,
};

function Index({ mataKuliah }) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);

    const dataUrut = [...mataKuliah].sort((a, b) => {
        const selisihHari =
            (urutanHari[a.hari] ?? 99) - (urutanHari[b.hari] ?? 99);
        if (selisihHari !== 0) return selisihHari;
        return a.jam.localeCompare(b.jam);
    });

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
        if (
            confirm(
                `Hapus mata kuliah "${item.nama}"? Semua tugas & referensi terkait juga akan terhapus.`,
            )
        ) {
            router.delete(`/mata-kuliah/${item.id}`, {
                onSuccess: () => toast.success("Mata kuliah berhasil dihapus"),
                onError: () => toast.error("Gagal menghapus mata kuliah"),
            });
        }
    };

    const formatJam = (jam) => jam?.slice(0, 5) ?? "-";

    const pisahDosen = (dosen) => dosen.split(" & ").map((d) => d.trim());

    const isEmpty = dataUrut.length === 0;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                        Mata Kuliah
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {mataKuliah.length} mata kuliah terdaftar
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
                    <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Belum ada mata kuliah.
                    </p>
                    <button
                        onClick={openTambah}
                        className="mt-4 text-sm text-teal-700 dark:text-teal-400 font-medium hover:underline"
                    >
                        Tambah mata kuliah pertama
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {dataUrut.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-3 pl-4 flex flex-col overflow-hidden hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md transition"
                        >
                            {/* Garis aksen teal di kiri */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-teal-600" />

                            {/* Header */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-sm font-semibold text-teal-700 dark:text-teal-400 leading-snug">
                                    {item.nama}
                                </h3>
                                <div className="flex items-center gap-1 shrink-0">
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

                            {/* Dosen */}
                            <div className="space-y-0.5 mb-2">
                                {pisahDosen(item.dosen).map((d, i) => (
                                    <p
                                        key={i}
                                        className="text-xs text-slate-600 dark:text-slate-400 leading-snug"
                                    >
                                        {d}
                                    </p>
                                ))}
                            </div>

                            {/* Info jadwal */}
                            <div className="space-y-1 text-sm border-t border-slate-100 dark:border-slate-700 pt-2">
                                {[
                                    { label: "Hari", value: item.hari },
                                    {
                                        label: "Jam",
                                        value: formatJam(item.jam),
                                    },
                                    { label: "Tempat", value: item.tempat },
                                ].map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex items-center justify-between gap-3"
                                    >
                                        <span className="text-xs text-teal-600 dark:text-teal-400 shrink-0">
                                            {row.label}
                                        </span>
                                        <span className="text-xs text-slate-700 dark:text-slate-300 text-right">
                                            {row.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && <Form mataKuliah={editData} onClose={closeForm} />}
        </>
    );
}

Index.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Index;
