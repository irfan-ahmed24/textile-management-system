import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Factory,
    LogIn,
    ArrowRight,
    Menu,
    X,
    BookOpen,
    Cpu,
    Phone,
} from "lucide-react";

export default function WelcomeLayout({ children }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navLinks = [
        { name: "Our Legacy", id: "legacy", icon: <BookOpen size={20} /> },
        { name: "Solutions", id: "solutions", icon: <Cpu size={20} /> },
        { name: "Contact", id: "contact", icon: <Phone size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#0F1219] text-slate-200 selection:bg-blue-500/30 font-sans">
            <Head title="TextileMS | Premium Solutions" />

            {/* --- Navigation Bar --- */}
            <nav
                className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
                    isScrolled
                        ? "bg-[#080B11]/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/5"
                        : "bg-[#080B11] py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="flex items-center gap-2.5 group"
                    >
                        <div className="bg-blue-600 p-2 rounded-xl transition-transform group-hover:scale-110">
                            <Factory size={22} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Textile<span className="text-blue-500">MS</span>
                        </span>
                    </button>

                    {/* Desktop Menu Links */}
                    <div className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-[0.2em] font-bold text-slate-400">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="hover:text-blue-400 transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Login Button (Primary Style Now) */}
                    <div className="hidden md:block">
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center gap-2 group shadow-lg shadow-blue-600/20"
                        >
                            <LogIn size={18} />
                            Login
                        </Link>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        className="md:hidden p-2 text-white bg-white/5 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* --- Mobile Sidebar --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] md:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="fixed right-0 top-0 h-full w-[280px] bg-[#080B11] z-[120] shadow-2xl p-6 md:hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                                <span className="font-bold text-blue-500 tracking-widest text-sm">
                                    MENU
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-white/5 rounded-full text-slate-400"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="flex items-center gap-4 text-lg font-semibold text-slate-300 hover:text-blue-500 transition w-full text-left"
                                    >
                                        <span className="p-2 bg-white/5 rounded-lg text-blue-400">
                                            {link.icon}
                                        </span>
                                        {link.name}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <Link
                                    href="/login"
                                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mb-4"
                                >
                                    <LogIn size={20} /> Login
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main>{children}</main>

            <footer className="bg-[#080B11] border-t border-white/5 py-12 text-slate-500 text-sm">
                <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="font-bold text-slate-300 flex items-center gap-2">
                        <Factory size={18} className="text-blue-500" />{" "}
                        TextileMS Industry Ltd.
                    </span>
                    <p className="text-xs uppercase tracking-widest">
                        &copy; 2026 Crafted with Precision
                    </p>
                </div>
            </footer>
        </div>
    );
}
