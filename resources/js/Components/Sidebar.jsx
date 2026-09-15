import { Link, usePage, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    BookOpen,
    ClipboardList,
    Library,
    Users,
    LogOut,
    X,
    GraduationCap,
    Sun,
    Moon,
    Monitor,
} from "lucide-react";
import { useTheme } from "../Contexts/ThemeContext";

const menu = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Mata Kuliah", href: "/mata-kuliah", icon: BookOpen },
    { label: "Tugas", href: "/tugas", icon: ClipboardList },
    { label: "Referensi", href: "/referensi", icon: Library },
    { label: "Mahasiswa", href: "/mahasiswa", icon: Users },
];

export default function Sidebar({ open, onClose }) {
    const { url } = usePage();
    const { theme, cycleTheme } = useTheme();

    const isActive = (href) => {
        if (href === "/") return url === "/";
        return url.startsWith(href);
    };

    const handleLogout = () => {
        if (confirm("Yakin ingin keluar?")) {
            router.post("/logout");
        }
    };

    const TemaIcon =
        theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
    const labelTema =
        theme === "light" ? "Terang" : theme === "dark" ? "Gelap" : "Sistem";

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50 transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0`}
            >
                {/* Header */}
                <div className="px-5 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shrink-0 shadow-md shadow-teal-500/20">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-base font-semibold leading-tight text-slate-800 dark:text-slate-100">
                            E-Class
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                            S2 PAI 1A
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="md:hidden p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition shrink-0"
                        aria-label="Tutup menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                                    active
                                        ? "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-medium"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                                }`}
                            >
                                <Icon
                                    className={`w-4 h-4 ${
                                        active
                                            ? "text-teal-600 dark:text-teal-400"
                                            : ""
                                    }`}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer: Tema + Logout */}
                <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <button
                        onClick={cycleTheme}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition"
                        aria-label={`Ganti tema (sekarang: ${labelTema})`}
                    >
                        <TemaIcon className="w-4 h-4" />
                        <span className="flex-1 text-left">
                            Tema {labelTema}
                        </span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition"
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar
                    </button>
                </div>
            </aside>
        </>
    );
}
