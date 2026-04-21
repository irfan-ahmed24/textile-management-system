import React from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    AlertCircle,
    ArrowRight,
    RefreshCcw,
    Package,
    TrendingDown,
    History,
} from "lucide-react";

function LowStock() {
    // ডামি ডাটা
    const lowStockItems = [
        {
            id: 1,
            name: "Polyester Fabric",
            code: "FAB-202",
            current_stock: 8,
            min_level: 20,
            unit: "Yards",
            category: "Fabric",
            last_out: "2 hours ago",
        },
        {
            id: 2,
            name: "Reactive Dye Blue",
            code: "CHM-505",
            current_stock: 2,
            min_level: 15,
            unit: "KG",
            category: "Chemical",
            last_out: "Yesterday",
        },
        {
            id: 3,
            name: "Cotton Yarn 40s",
            code: "YRN-088",
            current_stock: 15,
            min_level: 50,
            unit: "KG",
            category: "Yarn",
            last_out: "5 hours ago",
        },
    ];

    return (
        <InventoryLayout>
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
                        {lowStockItems.length > 0 ? (
                            lowStockItems.map((item, index) => (
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
                                                <h3 className="text-white font-black text-lg">
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
                                                    Stock Level
                                                </span>
                                                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">
                                                    {item.current_stock} /{" "}
                                                    {item.min_level} {item.unit}
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-500 rounded-full"
                                                    style={{
                                                        width: `${(item.current_stock / item.min_level) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden md:block">
                                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                    Last Out
                                                </p>
                                                <p className="text-white text-xs font-bold">
                                                    {item.last_out}
                                                </p>
                                            </div>
                                            <button className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl transition-all border border-white/5">
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-[#0F1219]/50 border border-dashed border-white/10 rounded-[3rem]">
                                <RefreshCcw
                                    className="mx-auto text-slate-700 mb-4"
                                    size={48}
                                />
                                <p className="text-slate-500 font-bold uppercase tracking-widest">
                                    All items are sufficiently stocked!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-[2.5rem] p-8">
                            <TrendingDown
                                className="text-amber-500 mb-4"
                                size={32}
                            />
                            <h4 className="text-white font-black text-xl mb-2">
                                Status Report
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                These items require immediate attention. Low
                                stock levels may interrupt the ongoing
                                production process.
                            </p>
                        </div>

                        <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8">
                            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-2">
                                <History size={16} className="text-blue-500" />{" "}
                                Recent Restock
                            </h4>
                            <div className="space-y-4">
                                <div className="border-l-2 border-blue-500/30 pl-4 py-1">
                                    <p className="text-white text-xs font-bold">
                                        White Yarn 20s
                                    </p>
                                    <p className="text-slate-500 text-[10px]">
                                        +500 KG Added
                                    </p>
                                </div>
                                <div className="border-l-2 border-green-500/30 pl-4 py-1">
                                    <p className="text-white text-xs font-bold">
                                        Acid Dye Green
                                    </p>
                                    <p className="text-slate-500 text-[10px]">
                                        +50 KG Added
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default LowStock;
