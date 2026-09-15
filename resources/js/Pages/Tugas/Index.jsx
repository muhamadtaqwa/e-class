import { useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import Form from "./Form";
import TugasStatusModal from "../../Components/TugasStatusModal";
import {
    Plus,
    Pencil,
    Trash2,
    ClipboardList,
    Calendar,
    Eye,
    EyeOff,
    Users,
} from "lucide-react";
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

export default function Index({ mataKuliah }) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [formMataKuliahId, setFormMataKuliahId] = useState(null);
    const [showLewat, setShowLewat] = useState({});
    const [statusTugas, setStatusTugas] = useState(null);

    const sekarang = new Date();

    const isLewat = (deadline) => new Date(deadline) < sekarang;

    const formatDeadline = (deadline) => {
        const d = new Date(deadline);
        const tanggal = d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        const jam = d.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${tanggal}, ${jam}`;
    };

    const dataUrut = [...mataKuliah].sort((a, b) => {
        const selisihHari =
            (urutanHari[a.hari] ?? 99) - (urutanHari[b.hari] ?? 99);
        if (selisihHari !== 0) return selisihHari;
        return a.jam.localeCompare(b.jam);
    });

    const openTambah = (mataKuliahId) => {
        setEditData(null);
        setFormMataKuliahId(mataKuliahId);
        setShowForm(true);
    };

    const openEdit = (tugas) => {
        setEditData(tugas);
        setFormMataKuliahId(tugas.mata_kuliah_id);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditData(null);
        setFormMataKuliahId(null);
    };

    const handleDelete = (tugas) => {
        if (confirm(`Hapus tugas "${tugas.judul}"?`)) {
            router.delete(`/tugas/${tugas.id}`, {
                onSuccess: () => toast.success("Tugas berhasil dihapus"),
                onError: () => toast.error("Gagal menghapus tugas"),
            });
        }
    };

    const toggleLewat = (mkId) => {
        setShowLewat((prev) => ({ ...prev, [mkId]: !prev[mkId] }));
    };

    return (
        <AppLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                    Tugas
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Daftar tugas per mata kuliah
                </p>
            </div>

            {dataUrut.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <ClipboardList className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Belum ada mata kuliah. Tambahkan mata kuliah dulu.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {dataUrut.map((mk) => {
                        const tugasAktif = (mk.tugas ?? []).filter(
                            (t) => !isLewat(t.deadline),
                        );
                        const tugasLewat = (mk.tugas ?? []).filter((t) =>
                            isLewat(t.deadline),
                        );
                        const bukaLewat = showLewat[mk.id];

                        return (
                            <div
                                key={mk.id}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                            >
                                {/* Header MK */}
                                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h2 className="font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                                                {mk.nama}
                                            </h2>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                {mk.dosen} · {mk.hari},{" "}
                                                {mk.jam?.slice(0, 5)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => openTambah(mk.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white text-xs font-medium rounded-lg transition shadow-sm shrink-0"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            Tugas
                                        </button>
                                    </div>
                                </div>

                                {/* Daftar Tugas */}
                                <div className="p-4">
                                    {tugasAktif.length === 0 &&
                                        tugasLewat.length === 0 && (
                                            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">
                                                Belum ada tugas untuk mata
                                                kuliah ini.
                                            </p>
                                        )}

                                    {tugasAktif.length === 0 &&
                                        tugasLewat.length > 0 && (
                                            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">
                                                Tidak ada tugas aktif.
                                            </p>
                                        )}

                                    {tugasAktif.length > 0 && (
                                        <div className="space-y-2">
                                            {tugasAktif.map((tugas) => (
                                                <TugasItem
                                                    key={tugas.id}
                                                    tugas={tugas}
                                                    formatDeadline={
                                                        formatDeadline
                                                    }
                                                    onEdit={openEdit}
                                                    onDelete={handleDelete}
                                                    onStatus={setStatusTugas}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {tugasLewat.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                            <button
                                                onClick={() =>
                                                    toggleLewat(mk.id)
                                                }
                                                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
                                            >
                                                {bukaLewat ? (
                                                    <EyeOff className="w-3.5 h-3.5" />
                                                ) : (
                                                    <Eye className="w-3.5 h-3.5" />
                                                )}
                                                {bukaLewat
                                                    ? "Sembunyikan"
                                                    : "Lihat"}{" "}
                                                tugas lewat ({tugasLewat.length}
                                                )
                                            </button>

                                            {bukaLewat && (
                                                <div className="space-y-2 mt-3">
                                                    {tugasLewat.map((tugas) => (
                                                        <TugasItem
                                                            key={tugas.id}
                                                            tugas={tugas}
                                                            formatDeadline={
                                                                formatDeadline
                                                            }
                                                            onEdit={openEdit}
                                                            onDelete={
                                                                handleDelete
                                                            }
                                                            onStatus={
                                                                setStatusTugas
                                                            }
                                                            lewat
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {showForm && (
                <Form
                    tugas={editData}
                    mataKuliahId={formMataKuliahId}
                    onClose={closeForm}
                />
            )}

            {statusTugas && (
                <TugasStatusModal
                    tugas={statusTugas}
                    onClose={() => setStatusTugas(null)}
                />
            )}
        </AppLayout>
    );
}

function TugasItem({
    tugas,
    formatDeadline,
    onEdit,
    onDelete,
    onStatus,
    lewat,
}) {
    return (
        <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${
                lewat
                    ? "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-60"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition"
            }`}
        >
            <div className="flex-1 min-w-0">
                <h3
                    className={`text-sm font-medium ${
                        lewat
                            ? "text-slate-500 dark:text-slate-400"
                            : "text-slate-800 dark:text-slate-100"
                    }`}
                >
                    {tugas.judul}
                </h3>
                {tugas.deskripsi && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {tugas.deskripsi}
                    </p>
                )}
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDeadline(tugas.deadline)}</span>
                    {lewat && (
                        <span className="ml-1 px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-[10px] font-medium">
                            LEWAT
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
                <button
                    onClick={() => onStatus(tugas)}
                    className="p-1.5 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
                    aria-label="Status mahasiswa"
                    title="Status mahasiswa"
                >
                    <Users className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onEdit(tugas)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
                    aria-label="Edit"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(tugas)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500 dark:text-red-400 transition"
                    aria-label="Hapus"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
