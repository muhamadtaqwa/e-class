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

function hitungHariSisa(deadline) {
    const d = new Date(deadline);
    const sekarang = new Date();
    return Math.ceil((d - sekarang) / (1000 * 60 * 60 * 24));
}

function formatTenggat(deadline) {
    const d = new Date(deadline);
    const tanggal = d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const jam = d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return `${tanggal} | ${jam.replace(":", ".")}`;
}

function getBadge(deadline) {
    const hari = hitungHariSisa(deadline);
    if (hari <= 0)
        return {
            label: "Hari ini",
            cls: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300",
        };
    if (hari === 1)
        return {
            label: "Besok",
            cls: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
        };
    if (hari <= 3)
        return {
            label: `${hari} hari`,
            cls: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
        };
    return {
        label: `${hari} hari`,
        cls: "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400",
    };
}

function Index({ mataKuliah }) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [formMataKuliahId, setFormMataKuliahId] = useState(null);
    const [showLewat, setShowLewat] = useState({});
    const [statusTugas, setStatusTugas] = useState(null);

    const isLewat = (deadline) => new Date(deadline) < new Date();

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
        <>
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
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
                        Belum ada mata kuliah.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
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
                                <div className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 dark:bg-teal-950/40 border-b border-teal-100 dark:border-teal-900">
                                    <h2 className="flex-1 min-w-0 text-sm font-semibold text-teal-800 dark:text-teal-300 truncate">
                                        {mk.nama}
                                    </h2>

                                    <div className="w-8 flex justify-center shrink-0">
                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300">
                                            {tugasAktif.length}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => openTambah(mk.id)}
                                        className="flex items-center gap-1 px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-medium rounded-md transition shrink-0"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Tugas
                                    </button>
                                </div>

                                {/* Daftar Tugas */}
                                <div className="p-2">
                                    {tugasAktif.length === 0 &&
                                        tugasLewat.length === 0 && (
                                            <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">
                                                Belum ada tugas.
                                            </p>
                                        )}

                                    {tugasAktif.length > 0 && (
                                        <div className="space-y-1">
                                            {tugasAktif.map((tugas) => (
                                                <TugasRow
                                                    key={tugas.id}
                                                    tugas={tugas}
                                                    onEdit={openEdit}
                                                    onDelete={handleDelete}
                                                    onStatus={setStatusTugas}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {tugasLewat.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                                            <button
                                                onClick={() =>
                                                    toggleLewat(mk.id)
                                                }
                                                className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition px-1"
                                            >
                                                {bukaLewat ? (
                                                    <EyeOff className="w-3 h-3" />
                                                ) : (
                                                    <Eye className="w-3 h-3" />
                                                )}
                                                {bukaLewat
                                                    ? "Sembunyikan"
                                                    : "Lihat"}{" "}
                                                tugas lewat ({tugasLewat.length}
                                                )
                                            </button>

                                            {bukaLewat && (
                                                <div className="space-y-1 mt-2">
                                                    {tugasLewat.map((tugas) => (
                                                        <TugasRow
                                                            key={tugas.id}
                                                            tugas={tugas}
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
        </>
    );
}

function TugasRow({ tugas, onEdit, onDelete, onStatus, lewat }) {
    const badge = getBadge(tugas.deadline);

    return (
        <div
            className={`px-2.5 py-2 rounded-lg transition ${
                lewat
                    ? "bg-slate-50 dark:bg-slate-900/50 opacity-60"
                    : "hover:bg-teal-50/60 dark:hover:bg-teal-950/30"
            }`}
        >
            {/* Baris 1: judul + badge */}
            <div className="flex items-center justify-between gap-2">
                <h3
                    className={`flex-1 min-w-0 text-sm font-medium truncate ${
                        lewat
                            ? "text-slate-500 dark:text-slate-400"
                            : "text-slate-800 dark:text-slate-100"
                    }`}
                >
                    {tugas.judul}
                </h3>

                {lewat ? (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                        LEWAT
                    </span>
                ) : (
                    <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${badge.cls}`}
                    >
                        {badge.label}
                    </span>
                )}
            </div>

            {/* Baris 2: tenggat + aksi */}
            <div className="flex items-center justify-between gap-2 mt-0.5">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 min-w-0">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span className="truncate">
                        {formatTenggat(tugas.deadline)}
                    </span>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                    <button
                        onClick={() => onStatus(tugas)}
                        className="p-1.5 rounded-md hover:bg-teal-100 dark:hover:bg-teal-900 text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-300 transition"
                        aria-label="Status mahasiswa"
                        title="Status mahasiswa"
                    >
                        <Users className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => onEdit(tugas)}
                        className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
                        aria-label="Edit"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => onDelete(tugas)}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950 text-red-500 dark:text-red-400 transition"
                        aria-label="Hapus"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Index;
