import React, { useState } from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    GitGraph,
    CheckCircle2,
    Circle,
    Scissors,
    Droplets,
    Wind,
    Box,
    ChevronRight,
    Search,
    RefreshCcw,
} from "lucide-react";
// ডাটা ইমপোর্ট
import { runningOrders, baseStages } from "@/Data/AllOrder";

const IconComponent = ({ name, size }) => {
    const icons = { Wind, GitGraph, Droplets, Scissors, Box };
    const Component = icons[name] || Box;
    return <Component size={size} />;
};

function ProductionStages() {
    const [searchId, setSearchId] = useState("");

    // ফিক্স: ইউজার সার্চ করলে সেই আইডি খুঁজবে, না পাওয়া গেলে কিছুই দেখাবে না (null)
    // এর ফলে ভুল স্টেজ দেখানোর ভয় থাকবে না
    const activeOrder = runningOrders.find((o) => o.id === searchId);

    return (
        <ProductionLayout>
            <Head title="Production Track" />
            <div className="p-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                            <GitGraph className="text-indigo-500" size={32} />
                            Order Tracking
                        </h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                            Enter Order ID to locate manufacturing stage
                        </p>
                    </div>
                    <div className="relative w-full md:w-96 group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Enter Order ID (e.g. 9921, 9925, 7701)..."
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full bg-[#0F1219] border border-white/10 rounded-[1.5rem] py-4 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-bold uppercase"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
                    {baseStages.map((stage, i) => {
                        // যদি কোনো অর্ডার খুঁজে পাওয়া যায়, তবেই স্টেজ ক্যালকুলেট হবে
                        const isCompleted = activeOrder
                            ? stage.id < activeOrder.currentStageId
                            : false;
                        const isCurrent = activeOrder
                            ? stage.id === activeOrder.currentStageId
                            : false;

                        return (
                            <motion.div
                                key={`${searchId}-${stage.id}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`relative bg-[#0F1219]/80 border ${isCurrent ? "border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-white/5"} rounded-[2.5rem] p-8 backdrop-blur-xl group transition-all duration-500`}
                            >
                                {i !== baseStages.length - 1 && (
                                    <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 text-white/5">
                                        <ChevronRight size={32} />
                                    </div>
                                )}
                                <div className="flex justify-between items-start mb-10">
                                    <div
                                        className={`p-4 rounded-2xl transition-all duration-500 ${isCurrent ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-110" : isCompleted ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-slate-600"}`}
                                    >
                                        <IconComponent
                                            name={stage.iconName}
                                            size={20}
                                        />
                                    </div>
                                    {isCurrent ? (
                                        <div className="w-6 h-6 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>
                                    ) : isCompleted ? (
                                        <CheckCircle2
                                            className="text-emerald-500"
                                            size={20}
                                        />
                                    ) : (
                                        <Circle
                                            className="text-slate-800"
                                            size={20}
                                        />
                                    )}
                                </div>
                                <div>
                                    <p
                                        className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isCurrent ? "text-amber-500" : isCompleted ? "text-emerald-500" : "text-slate-600"}`}
                                    >
                                        {isCurrent
                                            ? "In Progress"
                                            : isCompleted
                                              ? "Success"
                                              : `Stage 0${stage.id}`}
                                    </p>
                                    <h3
                                        className={`font-black text-lg uppercase tracking-tighter ${isCurrent ? "text-white" : isCompleted ? "text-slate-300" : "text-slate-600"}`}
                                    >
                                        {stage.name}
                                    </h3>
                                    {isCurrent && (
                                        <div className="mt-4 flex items-center gap-2">
                                            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
                                            <p className="text-amber-500/80 text-[9px] font-black uppercase tracking-widest">
                                                Live Tracking
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Status Footer */}
                <motion.div
                    layout
                    className="mt-12 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
                >
                    <div className="flex items-center gap-6">
                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${activeOrder ? "bg-amber-500 text-black rotate-12" : "bg-indigo-500/10 text-indigo-500"}`}
                        >
                            <RefreshCcw
                                size={28}
                                className={
                                    activeOrder ? "animate-spin-slow" : ""
                                }
                            />
                        </div>
                        <div>
                            <h4 className="text-white font-black text-xl uppercase tracking-tight">
                                {activeOrder
                                    ? `Tracking Order #${activeOrder.id}`
                                    : "Order Not Found"}
                            </h4>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                                {activeOrder
                                    ? `Product: ${activeOrder.product} | Last Update: ${activeOrder.lastUpdate}`
                                    : "Enter a valid Order ID (ORD-9921, ORD-9925, or ORD-7701)"}
                            </p>
                        </div>
                    </div>
                    {activeOrder && (
                        <div className="bg-black/40 px-8 py-4 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10px] font-black uppercase block mb-1">
                                Active Stage
                            </span>
                            <span className="text-amber-500 text-lg font-black uppercase">
                                {
                                    baseStages.find(
                                        (s) =>
                                            s.id === activeOrder.currentStageId,
                                    )?.name
                                }
                            </span>
                        </div>
                    )}
                </motion.div>
            </div>
        </ProductionLayout>
    );
}
export default ProductionStages;
