import { useForm } from "@inertiajs/react";
import { GraduationCap, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => toast.success("Login berhasil"),
            onError: () => toast.error("Email atau password salah"),
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 flex items-center justify-center px-4">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-400/25 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />

            <div className="relative w-full max-w-sm">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
                    <div className="flex flex-col items-center mb-7">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center mb-3 shadow-lg shadow-teal-600/30">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                            E-Class
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Manajemen Kelas S2 PAI
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    autoComplete="username"
                                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                                    placeholder="email@contoh.id"
                                    autoFocus
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoComplete="current-password"
                                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-teal-800 to-teal-600 hover:from-teal-900 hover:to-teal-700 text-white text-sm font-medium py-2.5 rounded-lg transition shadow-md shadow-teal-600/20 disabled:opacity-50"
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-teal-200/60 mt-6">
                    E-Class · Kelas S2 PAI
                </p>
            </div>
        </div>
    );
}
