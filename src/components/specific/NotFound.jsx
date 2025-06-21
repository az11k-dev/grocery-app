import { useEffect, useState } from "react";

export default function NotFound() {
    const [dots, setDots] = useState(".");

    // Анимация точек в стиле загрузки
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black text-primary-dark flex flex-col items-center justify-center h-screen font-mono px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-900/10 to-transparent animate-pulse" />

            <h1 className="text-[120px] font-bold tracking-widest drop-shadow-md z-10">404</h1>
            <p className="text-xl md:text-2xl z-10 text-center">Protocol failure: page not found{dots}</p>
            <a
                href="/"
                className="mt-8 z-10 px-6 py-2 border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-black transition-all rounded-full"
            >
                Reboot to Homepage
            </a>

            <div className="absolute bottom-4 text-sm text-primary-dark z-0">
                © {new Date().getFullYear()} J.A.R.V.I.S. OS — AZ11K Interface Systems
            </div>
        </div>
    );
}