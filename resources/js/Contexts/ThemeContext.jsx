import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "e-class-theme";

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "system";
        return localStorage.getItem(STORAGE_KEY) || "system";
    });

    // Tema efektif: kalau "system", ikuti preferensi OS
    const getEffectiveTheme = () => {
        if (theme === "system") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }
        return theme;
    };

    useEffect(() => {
        const effective = getEffectiveTheme();
        const root = document.documentElement;

        if (effective === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    // Pantau perubahan preferensi OS saat mode "system"
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const root = document.documentElement;
            if (mediaQuery.matches) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const cycleTheme = () => {
        setTheme((prev) => {
            if (prev === "light") return "dark";
            if (prev === "dark") return "system";
            return "light";
        });
    };

    const value = {
        theme,
        effectiveTheme:
            typeof window !== "undefined" ? getEffectiveTheme() : "light",
        cycleTheme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme harus dipakai di dalam ThemeProvider");
    }
    return context;
}
