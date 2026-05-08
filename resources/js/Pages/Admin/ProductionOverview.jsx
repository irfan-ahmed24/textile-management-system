import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Activity, Clock } from "lucide-react";

function ProductionOverview({ dbOrders, stats }) {
    return (
        <AdminLayout>
            <Head title="Production Tracking | Admin" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header & Stats Summary */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <Activity className="text-emerald-500" size={32} />
                            Production Tracking
                        </h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                            Real-time monitoring of active orders and
                            manufacturing stages
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-[#0F1219] border border-white/5 p-4 rounded-3xl flex items-center gap-4 shadow-xl">
                            <div className="text-right">
                                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">
                                    Active Orders
                                </p>
                                <p className="text-white font-black text-xl">
                                    {stats.active}
                                </p>
                            </div>
                            <div className="w-[1px] h-8 bg-white/10"></div>
                            <div className="text-right">
                                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">
                                    Completed
                                </p>
                                <p className="text-emerald-500 font-black text-xl">
                                    {stats.completed}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-6">
                                        Order ID & Product
                                    </th>
                                    <th className="px-6 py-6">Target Qty</th>
                                    <th className="px-6 py-6">
                                        Production Stage
                                    </th>
                                    <th className="px-6 py-6">Completion</th>
                                    <th className="px-6 py-6">Deadline</th>
                                    <th className="px-8 py-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {dbOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-white font-black text-sm group-hover:text-emerald-400 transition-colors uppercase">
                                                    {order.product}
                                                </span>
                                                <span className="text-slate-600 text-[10px] font-black mt-1">
                                                    {order.id}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-slate-300 font-bold text-sm">
                                            {order.total_qty}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                <span className="text-white text-xs font-black uppercase tracking-tighter">
                                                    {order.stage}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col w-32">
                                                <div className="flex justify-between mb-1.5">
                                                    <span className="text-[9px] font-black text-slate-500 uppercase">
                                                        {order.progress}%
                                                    </span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: `${order.progress}%`,
                                                        }}
                                                        className={`h-full rounded-full ${order.progress === 100 ? "bg-emerald-500" : "bg-indigo-500"}`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-slate-400 text-xs font-bold">
                                            <div className="flex items-center gap-2">
                                                <Clock
                                                    size={14}
                                                    className="text-slate-600"
                                                />
                                                {order.deadline}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <StatusBadge
                                                status={order.status}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        Urgent: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        Delayed: "bg-red-500/10 text-red-500 border-red-500/20",
        Completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    // যদি ডাটাবেসের স্ট্যাটাস কেস-সেনসিটিভ হয় তবে এটি কাজে দিবে
    const badgeStatus = styles[status] ? status : "Active";

    return (
        <span
            className={`text-[9px] px-3 py-1.5 border rounded-lg font-black uppercase tracking-widest ${styles[badgeStatus]}`}
        >
            {status}
        </span>
    );
}

export default ProductionOverview;
