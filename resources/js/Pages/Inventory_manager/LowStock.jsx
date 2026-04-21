import React from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    AlertCircle,
    ArrowRight,
    RefreshCcw,
    Package,
    TrendingDown,
    History,
} from "lucide-react";

function LowStock({ dbLowStockItems = [], recentRestock = [] }) {
    return (
        <InventoryLayout header="Inventory Alerts">
            <Head title="Low Stock Alerts | TextileMS" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <AlertCircle className="text-amber-500" size={28} />
                        Low Stock Alerts
                    </h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                        Items that are below the minimum safety threshold
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-3 space-y-4">
                        {dbLowStockItems.length > 0 ? (
                            dbLowStockItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#0F1219]/80 border border-white/5 hover:border-amber-500/30 rounded-[2rem] p-6 backdrop-blur-xl transition-all group shadow-xl"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center gap-5 w-full md:w-auto">
                                            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                                                <Package
                                                    className="text-amber-500"
                                                    size={24}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-black text-lg uppercase">
                                                    {item.name}
                                                </h3>
                                                <div className="flex gap-3 mt-1">
                                                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                                                        {item.code}
                                                    </span>
                                                    <span className="text-amber-500/80 text-[10px] font-black uppercase tracking-widest border border-amber-500/20 px-2 py-0.5 rounded">
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stock Level Indicator */}
                                        <div className="flex-1 w-full max-w-xs text-center md:text-left">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                                    Current Stock
                                                </span>
                                                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">
                                                    {item.current_stock} /{" "}
                                                    {item.min_level} {item.unit}
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width: `${Math.min((item.current_stock / item.min_level) * 100, 100)}%`,
                                                    }}
                                                    className="h-full bg-amber-500 rounded-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden md:block">
                                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                    Last Movement
                                                </p>
                                                <p className="text-white text-xs font-bold italic">
                                                    {item.last_out}
                                                </p>
                                            </div>
                                            {/* সরাসরি স্টক ইন পেজে যাওয়ার জন্য বাটন */}
                                            <Link
                                                href={route(
                                                    "inventory.stockIn",
                                                )}
                                                className="bg-white/5 hover:bg-amber-500 hover:text-black text-white p-4 rounded-2xl transition-all border border-white/5 shadow-lg active:scale-90"
                                            >
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-[#0F1219]/50 border border-dashed border-white/10 rounded-[3rem]"
                            >
                                <RefreshCcw
                                    className="mx-auto text-slate-700 mb-4 animate-spin-slow"
                                    size={48}
                                />
                                <p className="text-slate-500 font-bold uppercase tracking-widest">
                                    All items are sufficiently stocked!
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-[2.5rem] p-8 shadow-xl">
                            <TrendingDown
                                className="text-amber-500 mb-4"
                                size={32}
                            />
                            <h4 className="text-white font-black text-xl mb-2 uppercase tracking-tighter">
                                Status Report
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                You have{" "}
                                <span className="text-amber-500 font-bold">
                                    {dbLowStockItems.length} items
                                </span>{" "}
                                that require immediate attention. Replenish
                                stock to avoid production delays.
                            </p>
                        </div>

                        <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
                            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-2">
                                <History size={16} className="text-blue-500" />{" "}
                                Recent Restock
                            </h4>
                            <div className="space-y-4">
                                {recentRestock.length > 0 ? (
                                    recentRestock.map((log, i) => (
                                        <div
                                            key={i}
                                            className="border-l-2 border-blue-500/30 pl-4 py-1"
                                        >
                                            <p className="text-white text-xs font-bold uppercase truncate">
                                                {log.name}
                                            </p>
                                            <p className="text-blue-500 text-[10px] font-black uppercase mt-1">
                                                {log.qty_added}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-600 text-[10px] font-bold uppercase">
                                        No recent activity
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default LowStock;
