import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Menu, GraduationCap, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../Contexts/ThemeContext";

export default function AppLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, cycleTheme } = useTheme();

    const TemaIcon =
        theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="md:ml-64">
                {/* Header mobile */}
                <header className="md:hidden sticky top-0 z-30 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 px-4 py-3 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                        aria-label="Buka menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 flex-1">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                            E-Class
                        </span>
                    </div>

                    {/* Toggle tema (mobile) */}
                    <button
                        onClick={cycleTheme}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                        aria-label="Ganti tema"
                    >
                        <TemaIcon className="w-5 h-5" />
                    </button>
                </header>

                <main className="p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
