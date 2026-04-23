import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    MapPin,
    CreditCard,
    FileText,
    User,
    LogOut,
    Menu,
    X,
    Bell,
    Factory,
    Settings,
    ChevronDown,
} from "lucide-react";

export default function BuyerLayout({ children, header }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // ড্রপডাউন বাইরে ক্লিক করলে বন্ধ হওয়ার জন্য রেফারেন্স
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setIsNotificationsOpen(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navigation = [
        { name: "Dashboard", href: "/buyer/dashboard", icon: LayoutDashboard },
        { name: "My Orders", href: "/buyer/orders", icon: ShoppingBag },
        { name: "Track Order", href: "/buyer/track-order", icon: MapPin },
        { name: "Payment", href: "/buyer/payments", icon: CreditCard },
        { name: "Invoices", href: "/buyer/invoices", icon: FileText },
        { name: "Profile", href: "/profile/edit", icon: User },
    ];

    return (
        <div className="min-h-screen bg-[#0F1219] text-slate-200 font-sans overflow-x-hidden">
            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* --- Fixed Sidebar --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-[70] bg-[#080B11] border-r border-white/5 transition-all duration-300 ease-in-out flex flex-col overflow-hidden 
                ${isSidebarOpen ? "w-72 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"}`}
            >
                {/* Header Section Inside Sidebar */}
                <div className="h-20 flex items-center border-b border-white/5 relative overflow-hidden shrink-0">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen ? (
                            <motion.div
                                key="open-header"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center justify-between w-full px-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 p-2 rounded-lg shrink-0">
                                        <Factory
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                    <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
                                        Textile
                                        <span className="text-blue-500">
                                            MS
                                        </span>
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-1.5 text-slate-400 hover:text-white transition-colors shrink-0"
                                >
                                    <X size={20} />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="closed-header"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full hidden lg:flex justify-center"
                            >
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="p-2.5 text-slate-400 hover:text-blue-500 transition-all bg-white/5 rounded-xl border border-white/10"
                                >
                                    <Menu size={22} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto no-scrollbar">
                    {navigation.map((item) => {
                        const isActive = window.location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center h-12 rounded-xl transition-all duration-300 group relative ${
                                    isActive
                                        ? "bg-blue-600/10 text-blue-500 border border-blue-500/20"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                                } ${isSidebarOpen ? "px-4" : "justify-center"}`}
                            >
                                <item.icon
                                    size={22}
                                    className={`shrink-0 ${isSidebarOpen ? "mr-3" : ""}`}
                                />
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm font-semibold whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-3 border-t border-white/5 bg-[#080B11] shrink-0">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className={`flex items-center w-full h-12 text-sm font-bold text-slate-400 hover:text-red-400 transition-all ${isSidebarOpen ? "px-4" : "justify-center"}`}
                    >
                        <LogOut
                            size={22}
                            className={`shrink-0 ${isSidebarOpen ? "mr-3" : ""}`}
                        />
                        {isSidebarOpen && <span>Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* --- Main Content Wrapper --- */}
            <div
                className={`flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}
            >
                {/* --- Navbar --- */}
                <header className="bg-[#080B11]/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
                    {/* Mobile Toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-slate-400 bg-white/5 rounded-xl border border-white/10"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6 ml-auto">
                        {/* Notification Dropdown */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() =>
                                    setIsNotificationsOpen(!isNotificationsOpen)
                                }
                                className={`p-2.5 rounded-xl border transition-all relative ${isNotificationsOpen ? "bg-blue-600/10 text-blue-500 border-blue-500/20" : "text-slate-400 bg-white/5 border-white/10 hover:text-blue-500"}`}
                            >
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#080B11]"></span>
                            </button>

                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 15,
                                            scale: 0.95,
                                        }}
                                        className="absolute right-0 mt-4 w-80 md:w-96 bg-[#080B11] border border-white/5 rounded-2xl shadow-2xl z-[100] overflow-hidden"
                                    >
                                        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                            <h3 className="font-bold text-white text-base">
                                                Notifications
                                            </h3>
                                            <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                                                3 New
                                            </span>
                                        </div>
                                        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                                            {[
                                                {
                                                    title: "Order Shipped",
                                                    desc: "Your order #TX-9021 has been shipped.",
                                                    time: "2 mins ago",
                                                },
                                                {
                                                    title: "Payment Successful",
                                                    desc: "Payment for Invoice #INV-2024 has been verified.",
                                                    time: "1 hour ago",
                                                },
                                                {
                                                    title: "In Production",
                                                    desc: "Cotton Twill fabric is now in Dyeing stage.",
                                                    time: "5 hours ago",
                                                },
                                            ].map((n, i) => (
                                                <div
                                                    key={i}
                                                    className="p-4 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                                                >
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-500 transition-colors">
                                                            {n.title}
                                                        </h4>
                                                        <span className="text-[10px] text-slate-500 font-medium">
                                                            {n.time}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed">
                                                        {n.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full py-4 text-xs font-bold text-blue-500 hover:bg-blue-500/5 transition-all uppercase tracking-widest">
                                            View All Notifications
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className={`flex items-center gap-3 p-1.5 rounded-2xl border transition-all ${isProfileOpen ? "bg-white/10 border-blue-500/50" : "bg-white/5 border-white/10 hover:border-white/20"}`}
                            >
                                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-blue-600/20 text-sm">
                                    IA
                                </div>
                                <div className="hidden sm:block text-left mr-1">
                                    <p className="text-xs font-bold text-slate-200 leading-none mb-1">
                                        Irfan Ahmed
                                    </p>
                                    <span className="text-[9px] font-black uppercase text-blue-400 tracking-tighter">
                                        Buyer Account
                                    </span>
                                </div>
                                <ChevronDown
                                    size={14}
                                    className={`text-slate-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 15,
                                            scale: 0.95,
                                        }}
                                        className="absolute right-0 mt-4 w-56 bg-[#080B11] border border-white/5 rounded-2xl shadow-2xl z-[100] overflow-hidden p-2"
                                    >
                                        <Link
                                            href="/profile/edit"
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                                        >
                                            <User
                                                size={18}
                                                className="group-hover:text-blue-500"
                                            />
                                            <span className="font-semibold">
                                                My Profile
                                            </span>
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                                        >
                                            <Settings
                                                size={18}
                                                className="group-hover:text-blue-500"
                                            />
                                            <span className="font-semibold">
                                                Settings
                                            </span>
                                        </Link>
                                        <div className="h-px bg-white/5 my-2 px-4" />
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full text-left group"
                                        >
                                            <LogOut size={18} />
                                            <span className="font-bold">
                                                Logout
                                            </span>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* --- Page Content --- */}
                <main className="p-4 md:p-6 lg:p-10 max-w-full flex-1">
                    {header && (
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6 md:mb-10 flex items-center gap-3">
                            <span className="w-1.5 h-6 md:h-8 bg-blue-600 rounded-full"></span>
                            {header}
                        </h1>
                    )}
                    <div className="w-full">{children}</div>
                </main>
            </div>
        </div>
    );
}
