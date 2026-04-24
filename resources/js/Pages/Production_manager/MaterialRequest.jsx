import React from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    PackageSearch,
    Plus,
    Send,
    History,
    ShoppingCart,
    ChevronRight,
    AlertCircle,
} from "lucide-react";

function MaterialRequest() {
    // আগের রিকোয়েস্টগুলোর হিস্ট্রি
    const requestHistory = [
        {
            id: "REQ-001",
            item: "Cotton Yarn 30s",
            qty: "200 KG",
            status: "Approved",
            date: "22 Apr",
        },
        {
            id: "REQ-002",
            item: "Reactive Dye Red",
            qty: "15 KG",
            status: "Pending",
            date: "23 Apr",
        },
    ];

    return (
        <ProductionLayout>
            <Head title="Material Request | Production" />

            <div className="p-6 max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <PackageSearch className="text-blue-500" size={28} />
                        Material Requisition
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
                        Request raw materials from inventory for active
                        production
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Request Form (Standard UI) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                            <h3 className="text-white font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-2">
                                <Plus size={16} className="text-blue-500" /> New
                                Request Form
                            </h3>

                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                            Select Material
                                        </label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-bold appearance-none">
                                            <option className="bg-[#0F1219]">
                                                Cotton Yarn 30s
                                            </option>
                                            <option className="bg-[#0F1219]">
                                                Polyester Thread
                                            </option>
                                            <option className="bg-[#0F1219]">
                                                Indigo Dye
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                            Quantity (KG/Units)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 150"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Reason / Order ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Needed for #ORD-9921"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-bold"
                                    />
                                </div>

                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest pt-4">
                                    <Send size={16} /> Send Requisition
                                </button>
                            </form>
                        </div>

                        {/* Inventory Quick Alert */}
                        <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 flex items-center gap-4">
                            <AlertCircle className="text-amber-500" size={20} />
                            <p className="text-amber-200/70 text-[11px] font-medium leading-tight">
                                Note: Requested materials will be deducted from
                                inventory once the Warehouse Manager approves.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Recent History */}
                    <div className="space-y-6">
                        <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-6 shadow-xl h-full">
                            <h3 className="text-white font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-2">
                                <History size={16} className="text-slate-400" />{" "}
                                Recent Requests
                            </h3>

                            <div className="space-y-4">
                                {requestHistory.map((req) => (
                                    <div
                                        key={req.id}
                                        className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-white font-bold text-xs uppercase tracking-tight">
                                                {req.item}
                                            </span>
                                            <span
                                                className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                                                    req.status === "Approved"
                                                        ? "bg-emerald-500/10 text-emerald-500"
                                                        : "bg-amber-500/10 text-amber-500"
                                                }`}
                                            >
                                                {req.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-500 text-[9px] font-black uppercase">
                                            <span>Qty: {req.qty}</span>
                                            <span>{req.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 text-slate-500 hover:text-white text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1 transition-colors">
                                View Full History <ChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ProductionLayout>
    );
}

export default MaterialRequest;
