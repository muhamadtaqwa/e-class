import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function Form({ tugas, mataKuliahId, onClose }) {
    const isEdit = !!tugas;

    const { data, setData, post, put, processing, errors } = useForm({
        mata_kuliah_id: mataKuliahId ?? "",
        judul: tugas?.judul ?? "",
        deskripsi: tugas?.deskripsi ?? "",
        deadline: tugas?.deadline ? tugas.deadline.slice(0, 16) : "",
    });

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
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition resize-none"
                            placeholder="Keterangan tambahan tentang tugas"
                        />
                        {errors.deskripsi && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

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
