import { useForm } from "@inertiajs/react";
import { X, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function Form({ tugas, mataKuliahId, mahasiswaList, onClose }) {
    const isEdit = !!tugas;

    const { data, setData, post, put, processing, errors } = useForm({
        mata_kuliah_id: mataKuliahId ?? "",
        judul: tugas?.judul ?? "",
        deskripsi: tugas?.deskripsi ?? "",
        deadline: tugas?.deadline ? tugas.deadline.slice(0, 16) : "",
        mahasiswa_ids: tugas?.mahasiswa?.map((m) => m.id) ?? [],
    });

    const semuaTerpilih =
        mahasiswaList.length > 0 &&
        data.mahasiswa_ids.length === mahasiswaList.length;

    const toggleMahasiswa = (id) => {
        setData(
            "mahasiswa_ids",
            data.mahasiswa_ids.includes(id)
                ? data.mahasiswa_ids.filter((x) => x !== id)
                : [...data.mahasiswa_ids, id],
        );
    };

    const toggleSemua = () => {
        setData(
            "mahasiswa_ids",
            semuaTerpilih ? [] : mahasiswaList.map((m) => m.id),
        );
    };

    const submit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                toast.success(
                    isEdit
                        ? "Tugas berhasil diperbarui"
                        : "Tugas berhasil ditambahkan",
                );
                onClose();
            },
            onError: () => toast.error("Periksa kembali data yang diisi"),
        };

        if (isEdit) {
            put(`/tugas/${tugas.id}`, options);
        } else {
            post("/tugas", options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        {isEdit ? "Edit Tugas" : "Tambah Tugas"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* Judul */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Judul Tugas
                        </label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData("judul", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            placeholder="Contoh: Resume Bab 3"
                            autoFocus
                        />
                        {errors.judul && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Deskripsi{" "}
                            <span className="text-slate-400 dark:text-slate-500">
                                (opsional)
                            </span>
                        </label>
                        <textarea
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData("deskripsi", e.target.value)
                            }
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition resize-none"
                            placeholder="Keterangan tambahan tentang tugas"
                        />
                        {errors.deskripsi && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    {/* Pilihan Mahasiswa */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Untuk Mahasiswa{" "}
                                <span className="text-slate-400 dark:text-slate-500">
                                    ({data.mahasiswa_ids.length} dipilih)
                                </span>
                            </label>
                            <button
                                type="button"
                                onClick={toggleSemua}
                                className="text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition"
                            >
                                {semuaTerpilih ? "Hapus Semua" : "Pilih Semua"}
                            </button>
                        </div>

                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg max-h-48 overflow-y-auto">
                            {mahasiswaList.length === 0 ? (
                                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">
                                    Belum ada data mahasiswa.
                                </p>
                            ) : (
                                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {mahasiswaList.map((m) => {
                                        const dipilih =
                                            data.mahasiswa_ids.includes(m.id);
                                        return (
                                            <button
                                                key={m.id}
                                                type="button"
                                                onClick={() =>
                                                    toggleMahasiswa(m.id)
                                                }
                                                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition text-left"
                                            >
                                                <div
                                                    className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition ${
                                                        dipilih
                                                            ? "bg-teal-600 border-teal-600 dark:bg-teal-500 dark:border-teal-500"
                                                            : "border-slate-300 dark:border-slate-600"
                                                    }`}
                                                >
                                                    {dipilih && (
                                                        <Check
                                                            className="w-3 h-3 text-white"
                                                            strokeWidth={3}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-slate-800 dark:text-slate-100 truncate">
                                                        {m.nama}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                                        {m.nim}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {errors.mahasiswa_ids && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.mahasiswa_ids}
                            </p>
                        )}
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Deadline
                        </label>
                        <input
                            type="datetime-local"
                            value={data.deadline}
                            onChange={(e) =>
                                setData("deadline", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                        />
                        {errors.deadline && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.deadline}
                            </p>
                        )}
                    </div>

                    {/* Tombol */}
                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white text-sm font-medium rounded-lg transition shadow-sm disabled:opacity-50"
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
