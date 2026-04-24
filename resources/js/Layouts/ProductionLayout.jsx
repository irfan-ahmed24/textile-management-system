import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Activity,
    ClipboardList,
    Layers,
    CheckCircle,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    Factory,
    ChevronDown,
    Cpu,
    Truck,
    ShoppingBag,
} from "lucide-react";

export default function ProductionLayout({ children, header }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigation = [
        {
            name: "Prod. Dashboard",
            href: "/production-manager/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Running Orders",
            href: "/production-manager/running-order",
            icon: Activity,
        },
        {
            name: "Production Stages",
            href: "/production-manager/stages",
            icon: Layers,
        },
        {
            name: "Quality Control",
            href: "/production-manager/qc",
            icon: CheckCircle,
        },
        {
            name: "Order Requests",
            href: "/production-manager/order-request",
            icon: ShoppingBag,
        },
        {
            name: "Material Request",
            href: "/production-manager/material-request",
            icon: Truck,
        },
        {
            name: "Settings",
            href: "/production-manager/settings",
            icon: Settings,
        },
    ];

    const SidebarContent = (isMobile = false) => (
        <>
            <div className="flex items-center justify-between h-20 px-6 bg-[#080B11] overflow-hidden flex-shrink-0 border-b border-white/5">
                {isSidebarOpen || isMobile ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="bg-amber-600 p-2 rounded-xl flex-shrink-0 shadow-lg shadow-amber-600/20">
                            <Factory size={22} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap uppercase">
                            Prod.<span className="text-amber-500">Manager</span>
                        </span>
                    </motion.div>
                ) : (
                    <div className="flex-1"></div>
                )}

                <button
                    className="text-slate-500 hover:text-white transition-colors"
                    onClick={() => {
                        if (isMobile) setIsMobileMenuOpen(false);
                        else setIsSidebarOpen(!isSidebarOpen);
                    }}
                >
                    {isSidebarOpen || isMobile ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} className="mx-auto" />
                    )}
                </button>
            </div>

            <nav className="mt-8 px-3 flex-1 space-y-1.5 overflow-y-auto custom-scrollbar">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => isMobile && setIsMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                            window.location.pathname === item.href
                                ? "bg-amber-600/10 text-amber-500 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
                                : "text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                        }`}
                    >
                        <item.icon className="flex-shrink-0" size={20} />
                        {(isSidebarOpen || isMobile) && (
                            <span className="ml-3 whitespace-nowrap">
                                {item.name}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5 bg-[#080B11]">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center w-full px-4 py-3 text-sm font-bold text-slate-500 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/5"
                >
                    <LogOut className="flex-shrink-0" size={20} />
                    {(isSidebarOpen || isMobile) && (
                        <span className="ml-3">Sign Out</span>
                    )}
                </Link>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#0F1219] text-slate-200 flex font-sans overflow-hidden">
            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="fixed inset-y-0 left-0 z-[110] w-72 bg-[#080B11] flex flex-col lg:hidden border-r border-white/5"
                        >
                            {SidebarContent(true)}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.aside
                animate={{ width: isSidebarOpen ? "288px" : "80px" }}
                className="hidden lg:flex fixed inset-y-0 left-0 z-[30] bg-[#080B11] border-r border-white/5 flex-col transition-all duration-300"
            >
                {SidebarContent(false)}
            </motion.aside>

            {/* Main Content */}
            <motion.div
                animate={{
                    marginLeft:
                        window.innerWidth >= 1024
                            ? isSidebarOpen
                                ? "288px"
                                : "80px"
                            : "0px",
                }}
                className="flex-1 flex flex-col min-w-0 transition-all duration-300"
            >
                <header className="bg-[#080B11]/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2.5 text-slate-400 bg-white/5 rounded-xl border border-white/10"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-white tracking-tight truncate">
                            {header}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsNotificationsOpen(!isNotificationsOpen)
                                }
                                className={`p-2.5 text-slate-400 bg-white/5 rounded-xl border border-white/10 relative hover:text-amber-400 ${isNotificationsOpen ? "bg-amber-600/10 border-amber-500/50" : ""}`}
                            >
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-amber-500 rounded-full ring-2 ring-[#080B11]"></span>
                            </button>
                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() =>
                                                setIsNotificationsOpen(false)
                                            }
                                        ></div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-80 bg-[#080B11] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-white/5 font-bold text-sm text-amber-500">
                                                Production Updates
                                            </div>
                                            <div className="p-4 text-xs text-slate-500">
                                                Machine #4 is currently idle.
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative">
                            <div
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 px-3 cursor-pointer hover:bg-white/10 transition-all"
                            >
                                <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-600/20 text-sm">
                                    PM
                                </div>
                                <div className="hidden sm:block text-left mr-1">
                                    <p className="text-xs font-bold text-slate-200 leading-none">
                                        Prod. Manager
                                    </p>
                                </div>
                                <ChevronDown
                                    size={14}
                                    className={`text-slate-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                                />
                            </div>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() =>
                                                setIsProfileOpen(false)
                                            }
                                        ></div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-48 bg-[#080B11] border border-white/10 rounded-2xl shadow-2xl z-50 py-2"
                                        >
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Profile Settings
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-red-500/5 transition-colors"
                                            >
                                                Logout
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar bg-[#0F1219]">
                    {children}
                </main>
            </motion.div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D97706; }
            `,
                }}
            />
        </div>
    );
}
