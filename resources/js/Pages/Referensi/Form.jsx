import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function Form({ referensi, mataKuliah, onClose }) {
    const isEdit = !!referensi;

    const { data, setData, post, put, processing, errors } = useForm({
        mata_kuliah_id: referensi?.mata_kuliah_id ?? "",
        judul: referensi?.judul ?? "",
        penulis: referensi?.penulis ?? "",
        tahun: referensi?.tahun ?? new Date().getFullYear(),
        jenis: referensi?.jenis ?? "buku",
        link: referensi?.link ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                toast.success(
                    isEdit
                        ? "Referensi berhasil diperbarui"
                        : "Referensi berhasil ditambahkan",
                );
                onClose();
            },
            onError: () => toast.error("Periksa kembali data yang diisi"),
        };

        if (isEdit) {
            put(`/referensi/${referensi.id}`, options);
        } else {
            post("/referensi", options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        {isEdit ? "Edit Referensi" : "Tambah Referensi"}
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
                    {/* Mata Kuliah */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Mata Kuliah
                        </label>
                        <select
                            value={data.mata_kuliah_id}
                            onChange={(e) =>
                                setData("mata_kuliah_id", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                        >
                            <option value="">— Pilih Mata Kuliah —</option>
                            {mataKuliah.map((mk) => (
                                <option key={mk.id} value={mk.id}>
                                    {mk.nama}
                                </option>
                            ))}
                        </select>
                        {errors.mata_kuliah_id && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.mata_kuliah_id}
                            </p>
                        )}
                    </div>

                    {/* Judul */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData("judul", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            placeholder="Judul buku / jurnal"
                        />
                        {errors.judul && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    {/* Penulis */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Penulis
                        </label>
                        <input
                            type="text"
                            value={data.penulis}
                            onChange={(e) => setData("penulis", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            placeholder="Nama penulis"
                        />
                        {errors.penulis && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.penulis}
                            </p>
                        )}
                    </div>

                    {/* Tahun + Jenis */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Tahun
                            </label>
                            <input
                                type="number"
                                value={data.tahun}
                                onChange={(e) =>
                                    setData("tahun", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                                placeholder="2024"
                            />
                            {errors.tahun && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                    {errors.tahun}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Jenis
                            </label>
                            <select
                                value={data.jenis}
                                onChange={(e) =>
                                    setData("jenis", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            >
                                <option value="buku">Buku</option>
                                <option value="jurnal">Jurnal</option>
                            </select>
                            {errors.jenis && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                    {errors.jenis}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Link{" "}
                            <span className="text-slate-400 dark:text-slate-500">
                                (opsional)
                            </span>
                        </label>
                        <input
                            type="url"
                            value={data.link}
                            onChange={(e) => setData("link", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            placeholder="https://..."
                        />
                        {errors.link && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.link}
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
