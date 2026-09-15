import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    BookOpen,
    ClipboardList,
    Library,
    Users,
} from "lucide-react";

const menu = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "MatKul", href: "/mata-kuliah", icon: BookOpen },
    { label: "Tugas", href: "/tugas", icon: ClipboardList },
    { label: "Referensi", href: "/referensi", icon: Library },
    { label: "Mahasiswa", href: "/mahasiswa", icon: Users },
];

export default function BottomNav() {
    const { url } = usePage();

    const isActive = (href) => {
        if (href === "/") return url === "/";
        return url.startsWith(href);
    };

    const activeIndex = menu.findIndex((item) => isActive(item.href));
    const itemWidthPercent = 100 / menu.length;
    const bumpLeftPercent =
        itemWidthPercent * activeIndex + itemWidthPercent / 2;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
            <div className="relative pointer-events-auto">
                {/* Bump */}
                <div
                    className="absolute -top-6 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-600/40 ring-2 ring-slate-100 dark:ring-slate-900 flex items-center justify-center"
                    style={{
                        left: `${bumpLeftPercent}%`,
                        transition: "left 300ms ease-out",
                    }}
                >
                    {activeIndex >= 0 &&
                        (() => {
                            const ActiveIcon = menu[activeIndex].icon;
                            return (
                                <ActiveIcon
                                    className="w-6 h-6 text-white"
                                    strokeWidth={2.4}
                                />
                            );
                        })()}
                </div>

                {/* Bar */}
                <div className="flex items-stretch justify-around bg-white dark:bg-slate-900 rounded-2xl shadow-[0_-6px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-6px_20px_rgba(0,0,0,0.4)] border border-slate-200/70 dark:border-slate-800">
                    {menu.map((item, index) => {
                        const Icon = item.icon;
                        const active = index === activeIndex;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex-1 flex flex-col items-center justify-center gap-0.5 pt-3.5 pb-2.5 transition"
                            >
                                <Icon
                                    className={`w-5 h-5 transition-all duration-300 ${
                                        active
                                            ? "opacity-0 scale-50"
                                            : "opacity-100 scale-100 text-slate-400 dark:text-slate-500"
                                    }`}
                                    strokeWidth={2}
                                />
                                <span
                                    className={`text-[10px] font-medium transition-all duration-300 ${
                                        active
                                            ? "text-teal-600 dark:text-teal-400 font-semibold"
                                            : "text-slate-500 dark:text-slate-400"
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
