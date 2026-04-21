import React from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Trash2,
    PlusCircle,
    Scale,
    DollarSign,
    TrendingUp,
    Clock,
    MoreVertical,
    FileText,
} from "lucide-react";

function WasteManage() {
    // ডামি ডাটা (ঝুট বা ওয়েস্টেজ আইটেম)
    const wasteItems = [
        {
            id: 1,
            type: "Cotton Jhut",
            weight: "120",
            unit: "KG",
            source: "Knitting Floor",
            est_value: "150",
            date: "21 Apr, 2026",
            status: "In Store",
        },
        {
            id: 2,
            name: "Yarn Waste",
            weight: "45",
            unit: "KG",
            source: "Spinning Unit",
            est_value: "80",
            date: "20 Apr, 2026",
            status: "Sold",
        },
        {
            id: 3,
            name: "Fabric Scraps",
            weight: "210",
            unit: "KG",
            source: "Cutting Section",
            est_value: "300",
            date: "18 Apr, 2026",
            status: "In Store",
        },
    ];

    return (
        <InventoryLayout>
            <Head title="Waste Management | TextileMS" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-3">
                            <Trash2 className="text-red-500" size={28} />
                            Waste & Scrap Management
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                            Track production waste, scraps, and byproduct
                            inventory
                        </p>
                    </div>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all active:scale-95">
                        <PlusCircle size={20} /> Record New Waste
                    </button>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-500/10 rounded-2xl">
                                <Scale className="text-red-500" />
                            </div>
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase">
                                    Total Waste Weight
                                </p>
                                <h3 className="text-2xl font-black text-white">
                                    375{" "}
                                    <small className="text-xs text-slate-500">
                                        KG
                                    </small>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 rounded-2xl">
                                <DollarSign className="text-green-500" />
                            </div>
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase">
                                    Est. Resale Value
                                </p>
                                <h3 className="text-2xl font-black text-white">
                                    $530.00
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl">
                                <TrendingUp className="text-blue-500" />
                            </div>
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase">
                                    Recycling Rate
                                </p>
                                <h3 className="text-2xl font-black text-white">
                                    12.5%
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Waste Table */}
                <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <FileText size={18} className="text-slate-500" />{" "}
                            Recent Records
                        </h3>
                        <div className="flex gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">
                                Live Inventory
                            </span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">
                                        Waste Category
                                    </th>
                                    <th className="px-8 py-5">
                                        Source / Dept.
                                    </th>
                                    <th className="px-8 py-5">Weight (Qty)</th>
                                    <th className="px-8 py-5">Value (Est)</th>
                                    <th className="px-8 py-5">Date Recorded</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {wasteItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-8 py-5">
                                            <span className="text-white font-bold block">
                                                {item.type || item.name}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-slate-400 text-sm">
                                            {item.source}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-red-400 font-black">
                                                {item.weight} {item.unit}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-green-500 font-bold">
                                            ${item.est_value}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                <Clock size={14} /> {item.date}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span
                                                className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${item.status === "Sold" ? "bg-blue-500/10 text-blue-500" : "bg-orange-500/10 text-orange-500"}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-slate-600 hover:text-white transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default WasteManage;
