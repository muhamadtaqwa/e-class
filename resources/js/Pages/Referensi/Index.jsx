import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import Form from "./Form";
import ReferensiCard from "../../Components/ReferensiCard";
import { Plus, Library, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function Index({ referensi, mataKuliah, filters }) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState(filters?.search ?? "");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters?.search ?? "")) {
                applyFilter({ search });
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const applyFilter = (newFilter) => {
        router.get(
            "/referensi",
            {
                jenis: newFilter.jenis ?? filters?.jenis ?? "",
                mata_kuliah_id:
                    newFilter.mata_kuliah_id ?? filters?.mata_kuliah_id ?? "",
                search: newFilter.search ?? filters?.search ?? "",
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const resetFilter = () => {
        setSearch("");
        router.get("/referensi", {}, { preserveScroll: true, replace: true });
    };

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
        if (confirm(`Hapus referensi "${item.judul}"?`)) {
            router.delete(`/referensi/${item.id}`, {
                onSuccess: () => toast.success("Referensi berhasil dihapus"),
                onError: () => toast.error("Gagal menghapus referensi"),
            });
        }
    };

    const adaFilter =
        filters?.jenis || filters?.mata_kuliah_id || filters?.search;

    return (
        <AppLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                        Referensi
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {referensi.length} referensi
                        {adaFilter ? " (terfilter)" : ""}
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

            {/* Filter & Search */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-4 space-y-3">
                <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                        placeholder="Cari judul atau penulis..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <select
                        value={filters?.jenis ?? ""}
                        onChange={(e) => applyFilter({ jenis: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                    >
                        <option value="">Semua Jenis</option>
                        <option value="buku">Buku</option>
                        <option value="jurnal">Jurnal</option>
                    </select>

                    <select
                        value={filters?.mata_kuliah_id ?? ""}
                        onChange={(e) =>
                            applyFilter({ mata_kuliah_id: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                    >
                        <option value="">Semua Mata Kuliah</option>
                        {mataKuliah.map((mk) => (
                            <option key={mk.id} value={mk.id}>
                                {mk.nama}
                            </option>
                        ))}
                    </select>
                </div>

                {adaFilter && (
                    <button
                        onClick={resetFilter}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
                    >
                        Reset filter
                    </button>
                )}
            </div>

            {/* Daftar Referensi */}
            {referensi.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Library className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {adaFilter
                            ? "Tidak ada referensi yang cocok dengan filter."
                            : "Belum ada referensi."}
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {referensi.map((item) => (
                        <ReferensiCard
                            key={item.id}
                            item={item}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <Form
                    referensi={editData}
                    mataKuliah={mataKuliah}
                    onClose={closeForm}
                />
            )}
        </AppLayout>
    );
}
