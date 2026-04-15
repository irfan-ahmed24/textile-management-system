import React from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { motion } from "framer-motion";
import {
    Database,
    PlusCircle,
    MinusCircle,
    AlertTriangle,
    ArrowUpRight,
    TrendingDown,
    Activity,
    Boxes,
} from "lucide-react";

function Dashboard() {
    // ইনভেন্টরি ম্যানেজারের জন্য স্ট্যাটস ডাটা
    const inventoryStats = [
        {
            label: "Current Stock Items",
            value: "2,480 kg",
            icon: Database,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            trend: "+120kg today",
        },
        {
            label: "Total Stock In",
            value: "850 kg",
            icon: PlusCircle,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            trend: "Last 7 days",
        },
        {
            label: "Total Dispatched",
            value: "620 kg",
            icon: MinusCircle,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            trend: "In Production",
        },
        {
            label: "Stock Alerts",
            value: "04 Items",
            icon: AlertTriangle,
            color: "text-red-500",
            bg: "bg-red-500/10",
            trend: "Needs Attention",
        },
    ];

    return (
        <InventoryLayout header="Inventory Overview">
            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {inventoryStats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#080B11] border border-white/5 p-6 rounded-3xl hover:border-emerald-500/30 transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div
                                className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}
                            >
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">
                                Live
                            </span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium">
                            {stat.label}
                        </h3>
                        <p className="text-3xl font-bold text-white mt-1">
                            {stat.value}
                        </p>
                        <p
                            className={`text-[11px] mt-2 font-semibold ${stat.color === "text-red-500" ? "text-red-400" : "text-slate-500"}`}
                        >
                            {stat.trend}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* --- Recent Stock In/Out Log --- */}
                <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity
                                    className="text-emerald-500"
                                    size={20}
                                />{" "}
                                Movement Logs
                            </h2>
                            <p className="text-slate-500 text-xs mt-1">
                                সবশেষ ইনভেন্টরি ট্রানজ্যাকশনগুলো এখানে দেখুন।
                            </p>
                        </div>
                        <button className="bg-white/5 text-emerald-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-500/10 transition-all border border-emerald-500/20">
                            New Stock Entry
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-white/5">
                                    <th className="pb-4">Material</th>
                                    <th className="pb-4">Type</th>
                                    <th className="pb-4">Qty</th>
                                    <th className="pb-4 text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    {
                                        name: "Cotton Yarn 20s",
                                        type: "STOCK IN",
                                        color: "text-emerald-500",
                                        bg: "bg-emerald-500/10",
                                        qty: "+250kg",
                                        time: "10 mins ago",
                                    },
                                    {
                                        name: "Indigo Dye",
                                        type: "STOCK OUT",
                                        color: "text-red-400",
                                        bg: "bg-red-400/10",
                                        qty: "-45kg",
                                        time: "45 mins ago",
                                    },
                                    {
                                        name: "Polyester Thread",
                                        type: "STOCK IN",
                                        color: "text-emerald-500",
                                        bg: "bg-emerald-500/10",
                                        qty: "+100kg",
                                        time: "2 hours ago",
                                    },
                                    {
                                        name: "Caustic Soda",
                                        type: "STOCK OUT",
                                        color: "text-red-400",
                                        bg: "bg-red-400/10",
                                        qty: "-12kg",
                                        time: "5 hours ago",
                                    },
                                ].map((row, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="py-5 font-bold text-slate-300">
                                            {row.name}
                                        </td>
                                        <td className="py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tighter ${row.bg} ${row.color}`}
                                            >
                                                {row.type}
                                            </span>
                                        </td>
                                        <td
                                            className={`py-5 font-mono font-bold ${row.color}`}
                                        >
                                            {row.qty}
                                        </td>
                                        <td className="py-5 text-right text-slate-500 text-xs font-semibold">
                                            {row.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Inventory Critical Alert Section --- */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 rounded-[2.5rem] p-8">
                        <div className="flex items-center gap-3 mb-6 text-red-500">
                            <AlertTriangle size={24} />
                            <h2 className="text-lg font-bold text-white">
                                Critical Low Stock
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                {
                                    name: "Reactive Blue Dye",
                                    stock: "5kg remaining",
                                },
                                {
                                    name: "Softener Chemical",
                                    stock: "2kg remaining",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="text-sm font-bold text-slate-200">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-red-400 mt-1 font-semibold">
                                            {item.stock}
                                        </p>
                                    </div>
                                    <button className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                                        <PlusCircle size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Boxes className="text-emerald-500" size={20} />{" "}
                            Storage Health
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-slate-500">
                                        YARN SECTION
                                    </span>
                                    <span className="text-emerald-500">
                                        82% Full
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "82%" }}
                                        className="h-full bg-emerald-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-slate-500">
                                        CHEMICAL STORE
                                    </span>
                                    <span className="text-amber-500">
                                        45% Full
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "45%" }}
                                        className="h-full bg-amber-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default Dashboard;
