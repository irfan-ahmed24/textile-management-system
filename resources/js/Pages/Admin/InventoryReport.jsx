import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    BarChart3,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    PackageCheck,
    Scale,
    FilePieChart,
} from "lucide-react";

function InventoryReport() {
    // রিপোর্ট ডাটা (কন্ট্রোলার থেকে আসা ডাইনামিক ডাটার ডামি ভার্সন)
    const reportSummary = [
        {
            label: "Inventory Valuation",
            value: "$45,280",
            trend: "+12.5%",
            isUp: true,
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Purchase (This Month)",
            value: "$12,400",
            trend: "+5.2%",
            isUp: true,
            icon: PackageCheck,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Consumption Value",
            value: "$8,900",
            trend: "-2.1%",
            isUp: false,
            icon: FilePieChart,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            label: "Waste Value",
            value: "$420",
            trend: "-15%",
            isUp: false,
            icon: Scale,
            color: "text-red-500",
            bg: "bg-red-500/10",
        },
    ];

    return (
        <AdminLayout>
            <Head title="Inventory Reports | Admin" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <BarChart3 className="text-indigo-500" size={32} />
                            Inventory Analytics
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                            Comprehensive financial and stock movement reports
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-white/5 border border-white/10 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all font-bold text-sm">
                            <Calendar size={18} className="text-slate-400" />
                            <span>Last 30 Days</span>
                        </button>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
                            <Download size={18} /> Export PDF
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {reportSummary.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0F1219]/80 border border-white/5 p-7 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">
                                        {stat.label}
                                    </p>
                                    <h3 className="text-3xl font-black text-white tracking-tight">
                                        {stat.value}
                                    </h3>
                                    <div
                                        className={`flex items-center gap-1 mt-3 ${stat.isUp ? "text-emerald-500" : "text-red-500"}`}
                                    >
                                        {stat.isUp ? (
                                            <ArrowUpRight size={14} />
                                        ) : (
                                            <ArrowDownRight size={14} />
                                        )}
                                        <span className="text-xs font-bold">
                                            {stat.trend}
                                        </span>
                                        <span className="text-slate-600 text-[10px] font-bold uppercase ml-1">
                                            vs Last Month
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
                                >
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            {/* Decorative Background Blur */}
                            <div
                                className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[50px] opacity-10 ${stat.bg}`}
                            ></div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Monthly Expenditure Chart Placeholder */}
                    <div className="lg:col-span-2 bg-[#0F1219]/80 border border-white/5 rounded-[3rem] p-8 backdrop-blur-xl min-h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-white font-black uppercase text-xs tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>{" "}
                                Stock Valuation Trend
                            </h3>
                        </div>
                        {/* গ্রাফের জন্য জায়গা - আপনি এখানে Recharts ব্যবহার করতে পারেন */}
                        <div className="h-64 flex items-end justify-between gap-4 px-4">
                            {[40, 70, 45, 90, 65, 80, 50, 85, 30, 95].map(
                                (h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        className="w-full bg-indigo-500/20 border-t-2 border-indigo-500 rounded-t-lg relative group"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            Value: {h}k
                                        </div>
                                    </motion.div>
                                ),
                            )}
                        </div>
                        <div className="flex justify-between mt-6 px-4 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="bg-[#0F1219]/80 border border-white/5 rounded-[3rem] p-8 backdrop-blur-xl">
                        <h3 className="text-white font-black uppercase text-xs tracking-widest mb-8">
                            Asset Distribution
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-slate-400">
                                        Yarn Inventory
                                    </span>
                                    <span className="text-white">65%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-indigo-500"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-slate-400">
                                        Fabric Stock
                                    </span>
                                    <span className="text-white">25%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[25%] bg-emerald-500"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-slate-400">
                                        Chemicals
                                    </span>
                                    <span className="text-white">10%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[10%] bg-amber-500"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem]">
                            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
                                Admin Note
                            </p>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Current yarn stock is over-valued by 12%.
                                Suggested action: Reduce chemical procurement
                                for next month.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default InventoryReport;
