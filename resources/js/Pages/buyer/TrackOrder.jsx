import React, { useState, useEffect } from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    CheckCircle2,
    Clock,
    Package,
    Activity,
    FileSearch,
} from "lucide-react";

// নতুন স্টেজ "Order Pending" আইডি ০ হিসেবে যুক্ত করা হয়েছে
const baseStages = [
    { id: 0, name: "Order Pending" },
    { id: 1, name: "Yarn Processing" },
    { id: 2, name: "Knitting / Dyeing" },
    { id: 3, name: "Cutting & Stitching" },
    { id: 4, name: "Quality Check" },
    { id: 5, name: "Ready to Ship" },
];

function TrackOrder({ orders = [] }) {
    const [searchId, setSearchId] = useState("");
    const [foundOrder, setFoundOrder] = useState(null);

    useEffect(() => {
        if (searchId.trim() === "") {
            setFoundOrder(null);
            return;
        }

        const order = orders.find(
            (o) =>
                o.id.toString() ===
                searchId.toLowerCase().replace("#ord-", "").trim(),
        );

        if (order) {
            setFoundOrder(order);
        } else {
            setFoundOrder("not_found");
        }
    }, [searchId, orders]);

    return (
        <BuyerLayout>
            <Head title="Track Your Order" />

            <div className="p-6 max-w-[1000px] mx-auto text-white">
                {/* Search Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
                        Track Manufacturing Progress
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Enter your Order ID to see real-time production status
                    </p>

                    <div className="mt-8 flex max-w-md mx-auto gap-2">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Order ID (e.g. 102)..."
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {foundOrder && foundOrder !== "not_found" ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {/* Order Quick Summary */}
                            <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-8 flex flex-wrap justify-between items-center gap-6 shadow-2xl">
                                <div>
                                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                                        Product Name
                                    </p>
                                    <h3 className="text-white font-black text-xl uppercase tracking-tight">
                                        {foundOrder.product_name}
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                                        Status
                                    </p>
                                    <span
                                        className={`font-black text-sm uppercase flex items-center gap-2 ${foundOrder.status === "pending" ? "text-blue-400" : "text-amber-500"}`}
                                    >
                                        <Activity
                                            size={16}
                                            className={
                                                foundOrder.status !== "pending"
                                                    ? "animate-pulse"
                                                    : ""
                                            }
                                        />{" "}
                                        {foundOrder.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                                        Deadline
                                    </p>
                                    <h3 className="text-slate-300 font-bold text-sm uppercase">
                                        {new Date(
                                            foundOrder.target_delivery,
                                        ).toLocaleDateString()}
                                    </h3>
                                </div>
                            </div>

                            {/* Tracking Timeline */}
                            <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                                <div className="relative z-10 space-y-12">
                                    {baseStages.map((stage, i) => {
                                        // যদি স্ট্যাটাস pending হয় তবে কারেন্ট স্টেজ ০ (Pending) হবে
                                        const currentProgressId =
                                            foundOrder.status === "pending"
                                                ? 0
                                                : foundOrder.current_stage_id;

                                        const isCompleted =
                                            stage.id < currentProgressId;
                                        const isCurrent =
                                            stage.id === currentProgressId;

                                        return (
                                            <div
                                                key={stage.id}
                                                className="flex gap-8 relative group"
                                            >
                                                {/* Line Connector */}
                                                {i !==
                                                    baseStages.length - 1 && (
                                                    <div
                                                        className={`absolute left-[19px] top-10 bottom-[-30px] w-0.5 ${isCompleted ? "bg-indigo-500" : "bg-white/5"}`}
                                                    ></div>
                                                )}

                                                {/* Step Icon */}
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 z-10 transition-all duration-500 ${
                                                        isCurrent
                                                            ? "bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                                            : isCompleted
                                                              ? "bg-emerald-500 border-emerald-400"
                                                              : "bg-[#161b22] border-white/5"
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2
                                                            size={20}
                                                        />
                                                    ) : isCurrent ? (
                                                        <Clock
                                                            size={20}
                                                            className="animate-spin-slow"
                                                        />
                                                    ) : (
                                                        <span className="text-slate-700 text-xs font-black">
                                                            {stage.id === 0
                                                                ? "P"
                                                                : stage.id}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 pb-4">
                                                    <h4
                                                        className={`text-lg font-black uppercase tracking-tight ${isCurrent ? "text-white" : isCompleted ? "text-slate-300" : "text-slate-700"}`}
                                                    >
                                                        {stage.name}
                                                    </h4>
                                                    <p
                                                        className={`text-[10px] font-bold uppercase mt-1 ${isCurrent ? "text-indigo-400" : isCompleted ? "text-emerald-500/70" : "text-slate-800"}`}
                                                    >
                                                        {isCompleted
                                                            ? "Finished Successfully"
                                                            : isCurrent
                                                              ? foundOrder.status ===
                                                                "pending"
                                                                  ? "Waiting for admin to review"
                                                                  : "Currently in this stage"
                                                              : "Waiting to Start"}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ) : foundOrder === "not_found" ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-red-500/5 border border-dashed border-red-500/20 rounded-[2.5rem]"
                        >
                            <p className="text-red-500 font-black uppercase tracking-widest text-sm">
                                Order ID Not Found!
                            </p>
                            <p className="text-slate-600 text-xs mt-2 font-medium">
                                Please check your ID and try again.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem]">
                            <Package
                                className="mx-auto text-slate-800 mb-4"
                                size={48}
                            />
                            <p className="text-slate-600 font-black uppercase tracking-widest text-sm">
                                Ready to Track
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </BuyerLayout>
    );
}

export default TrackOrder;
