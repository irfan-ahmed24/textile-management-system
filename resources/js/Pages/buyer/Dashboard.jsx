import BuyerLayout from "@/Layouts/BuyerLayout";
import React from "react";
import {
    ShoppingBag,
    Truck,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    Timer,
    FileText,
} from "lucide-react";

function Dashboard() {
    const stats = [
        {
            label: "Active Orders",
            value: "05",
            icon: ShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "In Production",
            value: "03",
            icon: Timer,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            label: "Shipped",
            value: "12",
            icon: Truck,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
        },
        {
            label: "Completed",
            value: "48",
            icon: CheckCircle2,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
    ];

    return (
        <BuyerLayout header="Overview">
            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#080B11] border border-white/5 p-6 rounded-2xl hover:border-blue-500/30 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div
                                className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}
                            >
                                <stat.icon size={24} />
                            </div>
                            <span className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                <ArrowUpRight size={12} className="mr-1" /> 12%
                            </span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium">
                            {stat.label}
                        </h3>
                        <p className="text-2xl font-bold text-white mt-1">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* --- Recent Orders Table --- */}
                <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-3xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            Recent Orders
                        </h2>
                        <button className="text-sm text-blue-500 hover:underline font-semibold">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-white/5">
                                    <th className="pb-4 font-bold">Order ID</th>
                                    <th className="pb-4 font-bold">Product</th>
                                    <th className="pb-4 font-bold">Status</th>
                                    <th className="pb-4 font-bold text-right">
                                        Progress
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    {
                                        id: "#TX-9021",
                                        name: "Cotton Twill",
                                        status: "Dyeing",
                                        color: "text-amber-500",
                                        bg: "bg-amber-500/10",
                                        p: "65%",
                                    },
                                    {
                                        id: "#TX-8842",
                                        name: "Denim Fabric",
                                        status: "Knitting",
                                        color: "text-blue-500",
                                        bg: "bg-blue-500/10",
                                        p: "30%",
                                    },
                                    {
                                        id: "#TX-7710",
                                        name: "Silk Blend",
                                        status: "Finishing",
                                        color: "text-emerald-500",
                                        bg: "bg-emerald-500/10",
                                        p: "90%",
                                    },
                                ].map((row, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="py-5 font-bold text-slate-300">
                                            {row.id}
                                        </td>
                                        <td className="py-5 text-slate-400">
                                            {row.name}
                                        </td>
                                        <td className="py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${row.bg} ${row.color}`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-5 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-blue-500`}
                                                        style={{ width: row.p }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-bold text-slate-500">
                                                    {row.p}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Quick Support Card --- */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl shadow-blue-600/10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-white mb-2">
                                Need Help?
                            </h2>
                            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                                আপনার অর্ডারের কোনো সমস্যা হলে বা নতুন
                                কাস্টমাইজেশন লাগলে সরাসরি আমাদের ম্যানেজারের
                                সাথে যোগাযোগ করুন।
                            </p>
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                                <AlertCircle size={18} /> Contact Support
                            </button>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    </div>

                    <div className="bg-[#080B11] border border-white/5 rounded-3xl p-8">
                        <h2 className="text-lg font-bold text-white mb-4">
                            Latest Invoices
                        </h2>
                        <div className="space-y-4">
                            {["Inv-2024-01", "Inv-2024-02"].map((inv, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                            <FileText size={16} />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-300">
                                            {inv}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-blue-500">
                                        Download
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Dashboard;
