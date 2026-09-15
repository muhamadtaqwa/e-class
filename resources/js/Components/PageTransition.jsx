import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function PageTransition({ children }) {
    const { url } = usePage();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Saat URL berubah, fade out lalu fade in
        setVisible(false);

        const timer = setTimeout(() => {
            setVisible(true);
        }, 20);

        return () => clearTimeout(timer);
    }, [url]);

    return (
        <div
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 200ms ease-in-out",
            }}
        >
            {children}
        </div>
    );
}
