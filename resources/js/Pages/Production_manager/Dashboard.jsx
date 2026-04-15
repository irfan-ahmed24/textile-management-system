import React from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { motion } from "framer-motion";
import {
    Activity,
    Layers,
    Cpu,
    CheckCircle2,
    AlertCircle,
    Timer,
    ArrowUpRight,
    Play,
} from "lucide-react";

function Dashboard() {
    // প্রোডাকশন স্ট্যাটস ডাটা
    const prodStats = [
        {
            label: "Running Orders",
            value: "08",
            icon: Activity,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            detail: "On Factory Floor",
        },
        {
            label: "Pending Stages",
            value: "14",
            icon: Layers,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            detail: "Awaiting Action",
        },
        {
            label: "Active Machines",
            value: "18/20",
            icon: Cpu,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            detail: "90% Efficiency",
        },
        {
            label: "QC Passed",
            value: "98.2%",
            icon: CheckCircle2,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            detail: "Weekly Average",
        },
    ];

    return (
        <ProductionLayout header="Production Dashboard">
            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {prodStats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#080B11] border border-white/5 p-6 rounded-3xl hover:border-amber-500/30 transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div
                                className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}
                            >
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">
                                Active
                            </span>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium">
                            {stat.label}
                        </h3>
                        <p className="text-3xl font-bold text-white mt-1">
                            {stat.value}
                        </p>
                        <p className="text-[11px] mt-2 text-slate-500 font-semibold flex items-center gap-1">
                            <Timer size={12} /> {stat.detail}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* --- Live Production Line --- */}
                <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Play
                                    className="text-amber-500 fill-amber-500"
                                    size={18}
                                />{" "}
                                Live Production Line
                            </h2>
                            <p className="text-slate-500 text-xs mt-1">
                                বর্তমানে চলমান অর্ডারের ধাপসমূহ তদারকি করুন।
                            </p>
                        </div>
                        <button className="text-amber-500 text-xs font-bold hover:underline">
                            View Floor Map
                        </button>
                    </div>

                    <div className="space-y-8">
                        {[
                            {
                                id: "#ORD-771",
                                name: "Premium Denim",
                                stage: "Dyeing",
                                progress: 65,
                                status: "Normal",
                            },
                            {
                                id: "#ORD-802",
                                name: "Cotton Polo-Shirt",
                                stage: "Knitting",
                                progress: 30,
                                status: "Delayed",
                            },
                            {
                                id: "#ORD-910",
                                name: "Silk Scarf",
                                stage: "Finishing",
                                progress: 90,
                                status: "Urgent",
                            },
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="flex justify-between items-end mb-3">
                                    <div>
                                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                                            {item.id}
                                        </span>
                                        <h3 className="text-sm font-bold text-slate-200">
                                            {item.name}
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <span
                                            className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                                                item.status === "Delayed"
                                                    ? "bg-red-500/10 text-red-500"
                                                    : item.status === "Urgent"
                                                      ? "bg-purple-500/10 text-purple-500"
                                                      : "bg-emerald-500/10 text-emerald-500"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                        <p className="text-xs font-bold text-slate-400 mt-1">
                                            {item.stage}: {item.progress}%
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progress}%` }}
                                        transition={{
                                            duration: 1,
                                            delay: i * 0.2,
                                        }}
                                        className={`h-full ${item.status === "Delayed" ? "bg-red-500" : "bg-amber-500"}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Machine Status & QC --- */}
                <div className="space-y-6">
                    <div className="bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Cpu className="text-amber-500" size={20} /> Machine
                            Load
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                {
                                    name: "Knitting Unit",
                                    status: "Active",
                                    val: "85%",
                                },
                                {
                                    name: "Dyeing Vat",
                                    status: "Idle",
                                    val: "0%",
                                },
                                {
                                    name: "Boiler System",
                                    status: "Active",
                                    val: "92%",
                                },
                                {
                                    name: "Finishing MC",
                                    status: "Active",
                                    val: "40%",
                                },
                            ].map((m, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center"
                                >
                                    <p className="text-[10px] font-bold text-slate-500 uppercase">
                                        {m.name}
                                    </p>
                                    <p className="text-lg font-bold text-white mt-1">
                                        {m.val}
                                    </p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <div
                                            className={`h-1.5 w-1.5 rounded-full ${m.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-600"}`}
                                        ></div>
                                        <span className="text-[9px] text-slate-400 font-bold">
                                            {m.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-600/20 to-transparent border border-amber-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle
                                    className="text-amber-500"
                                    size={18}
                                />
                                <h2 className="text-lg font-bold text-white">
                                    QC Pending
                                </h2>
                            </div>
                            <p className="text-slate-400 text-xs mb-6">
                                ৩টি নতুন ব্যাচ কোয়ালিটি চেকের জন্য অপেক্ষা করছে।
                            </p>
                            <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-[#080B11] rounded-xl font-bold text-xs transition-all shadow-lg shadow-amber-500/20 uppercase tracking-widest">
                                Start Inspection
                            </button>
                        </div>
                        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                            <CheckCircle2 size={120} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </ProductionLayout>
    );
}

export default Dashboard;
