import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const hariOptions = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
];

export default function Form({ mataKuliah, onClose }) {
    const isEdit = !!mataKuliah;

    const { data, setData, post, put, processing, errors } = useForm({
        nama: mataKuliah?.nama ?? "",
        dosen: mataKuliah?.dosen ?? "",
        hari: mataKuliah?.hari ?? "Senin",
        jam: mataKuliah?.jam?.slice(0, 5) ?? "",
        tempat: mataKuliah?.tempat ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                toast.success(
                    isEdit
                        ? "Mata kuliah berhasil diperbarui"
                        : "Mata kuliah berhasil ditambahkan",
                );
                onClose();
            },
            onError: () => toast.error("Periksa kembali data yang diisi"),
        };

        if (isEdit) {
            put(`/mata-kuliah/${mataKuliah.id}`, options);
        } else {
            post("/mata-kuliah", options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        {isEdit ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
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
                            Nama Mata Kuliah
                        </label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            placeholder="Contoh: Filsafat Pendidikan Islam"
                            autoFocus
                        />
                        {errors.nama && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Dosen
                        </label>
                        <input
                            type="text"
                            value={data.dosen}
                            onChange={(e) => setData("dosen", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            placeholder="Nama dosen"
                        />
                        {errors.dosen && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.dosen}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Hari
                            </label>
                            <select
                                value={data.hari}
                                onChange={(e) =>
                                    setData("hari", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            >
                                {hariOptions.map((h) => (
                                    <option key={h} value={h}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                            {errors.hari && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                    {errors.hari}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Jam
                            </label>
                            <input
                                type="time"
                                value={data.jam}
                                onChange={(e) => setData("jam", e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            />
                            {errors.jam && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                    {errors.jam}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Tempat / Ruangan
                        </label>
                        <input
                            type="text"
                            value={data.tempat}
                            onChange={(e) => setData("tempat", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                            placeholder="Contoh: Ruang A / Zoom"
                        />
                        {errors.tempat && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                {errors.tempat}
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
