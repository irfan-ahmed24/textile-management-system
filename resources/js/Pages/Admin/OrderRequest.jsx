import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    ClipboardList,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Package,
    DollarSign,
    MoreHorizontal,
    Search,
} from "lucide-react";

function OrderRequest() {
    // ডামি ডাটা (ইনভেন্টরি ম্যানেজার থেকে আসা রিকোয়েস্ট)
    const requests = [
        {
            id: 1,
            item: "Cotton Yarn 30s",
            qty: "500 KG",
            est_price: "$1,750",
            requested_by: "Irfan (Manager)",
            date: "21 Apr, 2026",
            priority: "High",
            status: "Pending",
        },
        {
            id: 2,
            item: "Reactive Dye Red",
            qty: "50 KG",
            est_price: "$400",
            requested_by: "Ahmed (Store)",
            date: "20 Apr, 2026",
            priority: "Medium",
            status: "Pending",
        },
        {
            id: 3,
            item: "Polyester Fabric",
            qty: "200 Yards",
            est_price: "$2,400",
            requested_by: "Irfan (Manager)",
            date: "19 Apr, 2026",
            priority: "Urgent",
            status: "Approved",
        },
    ];

    return (
        <AdminLayout>
            <Head title="Purchase Requests | Admin" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-3">
                            <ClipboardList
                                className="text-indigo-500"
                                size={28}
                            />
                            Order Requests
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                            Review and approve material procurement requests
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-6">
                                        Material Details
                                    </th>
                                    <th className="px-6 py-6">Requested By</th>
                                    <th className="px-6 py-6">Est. Cost</th>
                                    <th className="px-6 py-6">Priority</th>
                                    <th className="px-6 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {requests.map((req, i) => (
                                    <motion.tr
                                        key={req.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-indigo-500/10 rounded-xl">
                                                    <Package
                                                        className="text-indigo-500"
                                                        size={20}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm uppercase tracking-tight">
                                                        {req.item}
                                                    </p>
                                                    <p className="text-slate-500 text-[10px] font-black uppercase mt-1">
                                                        Qty: {req.qty}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <User
                                                    size={14}
                                                    className="text-slate-500"
                                                />
                                                <div>
                                                    <p className="text-slate-300 text-xs font-bold">
                                                        {req.requested_by}
                                                    </p>
                                                    <p className="text-slate-500 text-[10px] font-medium">
                                                        {req.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-emerald-500 font-mono font-bold">
                                            {req.est_price}
                                        </td>
                                        <td className="px-6 py-6">
                                            <span
                                                className={`text-[9px] font-black uppercase px-2 py-1 rounded border ${
                                                    req.priority === "Urgent"
                                                        ? "text-red-500 border-red-500/20 bg-red-500/5"
                                                        : req.priority ===
                                                            "High"
                                                          ? "text-orange-500 border-orange-500/20 bg-orange-500/5"
                                                          : "text-blue-500 border-blue-500/20 bg-blue-500/5"
                                                }`}
                                            >
                                                {req.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-1.5 h-1.5 rounded-full ${req.status === "Pending" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`}
                                                ></div>
                                                <span
                                                    className={`text-[10px] font-black uppercase ${req.status === "Pending" ? "text-amber-500" : "text-emerald-500"}`}
                                                >
                                                    {req.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {req.status === "Pending" && (
                                                    <>
                                                        <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10">
                                                            <CheckCircle
                                                                size={18}
                                                            />
                                                        </button>
                                                        <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10">
                                                            <XCircle
                                                                size={18}
                                                            />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white transition-all">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl">
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
                            Total Pending Cost
                        </p>
                        <h4 className="text-2xl font-black text-white">
                            $2,150.00
                        </h4>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                Requests Today
                            </p>
                            <h4 className="text-2xl font-black text-white">
                                08
                            </h4>
                        </div>
                        <Clock className="text-slate-600" size={32} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default OrderRequest;
