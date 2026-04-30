import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Truck,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Factory,
    Database,
    FileBarChart,
    ChevronDown,
    Check,
    Clock,
} from "lucide-react";

export default function AdminLayout({ children, header }) {
    // Inertia Shared Props থেকে নোটিফিকেশন ডাটা নেওয়া
    const { notifications = [] } = usePage().props;

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
    const markAsRead = (id) => {
        router.patch(
            route("admin.notification.read", id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    // এটি inertia props থেকে আসায় অটোমেটিক লিস্ট থেকে চলে যাবে
                },
            },
        );
    };

    const navigation = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        {
            name: "User Management",
            href: "/admin/user-management",
            icon: Users,
        },
        { name: "User Requests", href: "/admin/user-requests", icon: Users },
        {
            name: "Inventory Reports",
            href: "/admin/Inventory_Report",
            icon: Database,
        },
        {
            name: "Order Requests",
            href: "/admin/order-requests",
            icon: ShoppingCart,
        },
        {
            name: "Production Overview",
            href: "/admin/production",
            icon: Factory,
        },
        {
            name: "Financial Reports",
            href: "/admin/reports",
            icon: FileBarChart,
        },
        { name: "System Settings", href: "/admin/settings", icon: Settings },
    ];

    const SidebarContent = () => (
        <>
            <div className="flex items-center justify-between h-20 px-6 bg-[#080B11] overflow-hidden flex-shrink-0 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-xl flex-shrink-0">
                        <Factory size={22} className="text-white" />
                    </div>
                    {(isSidebarOpen || window.innerWidth < 1024) && (
                        <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap uppercase">
                            Admin<span className="text-indigo-500">Panel</span>
                        </span>
                    )}
                </div>
                <button
                    className="lg:hidden text-slate-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X size={24} />
                </button>
            </div>

            <nav className="mt-8 px-3 flex-1 space-y-1.5 overflow-y-auto custom-scrollbar">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                            window.location.pathname === item.href
                                ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                                : "text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                        }`}
                    >
                        <item.icon className="flex-shrink-0" size={20} />
                        {(isSidebarOpen || window.innerWidth < 1024) && (
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
                    {(isSidebarOpen || window.innerWidth < 1024) && (
                        <span className="ml-3">Exit System</span>
                    )}
                </Link>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#0F1219] text-slate-200 flex font-sans overflow-hidden">
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
                            className="fixed inset-y-0 left-0 z-[110] w-72 bg-[#080B11] flex flex-col lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <motion.aside
                animate={{ width: isSidebarOpen ? "288px" : "80px" }}
                className="hidden lg:flex fixed inset-y-0 left-0 z-[70] bg-[#080B11] border-r border-white/5 flex-col transition-all duration-300"
            >
                <SidebarContent />
            </motion.aside>

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
                            className="p-2.5 text-slate-400 bg-white/5 rounded-xl border border-white/10 hover:text-indigo-500 transition-all"
                            onClick={() =>
                                isSidebarOpen
                                    ? setIsSidebarOpen(false)
                                    : window.innerWidth < 1024
                                      ? setIsMobileMenuOpen(true)
                                      : setIsSidebarOpen(true)
                            }
                        >
                            <Menu
                                size={24}
                                className={
                                    !isSidebarOpen && window.innerWidth >= 1024
                                        ? "rotate-180"
                                        : ""
                                }
                            />
                        </button>
                        <h1 className="text-xl font-bold text-white tracking-tight truncate">
                            {header}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsNotificationsOpen(!isNotificationsOpen)
                                }
                                className={`p-2.5 text-slate-400 bg-white/5 rounded-xl border border-white/10 relative hover:text-indigo-400 transition-colors ${isNotificationsOpen ? "bg-indigo-600/10 border-indigo-500/50 text-indigo-400" : ""}`}
                            >
                                <Bell size={20} />
                                {notifications.length > 0 && (
                                    <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#080B11] animate-pulse"></span>
                                )}
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
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.95,
                                            }}
                                            className="absolute right-0 mt-3 w-80 bg-[#0F1219] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                                        >
                                            <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                                                <span className="font-bold text-xs uppercase tracking-widest text-slate-200">
                                                    Notifications
                                                </span>
                                                <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                    {notifications.length} New
                                                </span>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                                {notifications.length > 0 ? (
                                                    notifications.map((n) => (
                                                        <div
                                                            key={n.id}
                                                            className="p-4 border-b border-white/5 hover:bg-white/5 transition group relative"
                                                        >
                                                            <div className="flex justify-between items-start gap-3">
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-slate-200 leading-snug">
                                                                        {
                                                                            n.message
                                                                        }
                                                                    </p>
                                                                    <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                                                                        <Clock
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                        <span className="text-[10px] font-medium italic">
                                                                            {new Date(
                                                                                n.created_at,
                                                                            ).toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        markAsRead(
                                                                            n.id,
                                                                        );
                                                                    }}
                                                                    className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-500 hover:text-white"
                                                                    title="Mark as read"
                                                                >
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-10 text-center">
                                                        <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                                            <Bell
                                                                size={20}
                                                                className="text-slate-600"
                                                            />
                                                        </div>
                                                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                                                            No new alerts
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile Menu */}
                        <div className="relative">
                            <div
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 px-3 cursor-pointer hover:bg-white/10 transition-all"
                            >
                                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20 text-sm">
                                    AD
                                </div>
                                <div className="hidden sm:block text-left mr-1">
                                    <p className="text-xs font-bold text-slate-200 leading-none">
                                        Admin Root
                                    </p>
                                </div>
                                <ChevronDown
                                    size={14}
                                    className={`text-slate-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
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
                                                className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5"
                                            >
                                                Settings
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-red-500/5"
                                            >
                                                Sign out
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
        </div>
    );
}
