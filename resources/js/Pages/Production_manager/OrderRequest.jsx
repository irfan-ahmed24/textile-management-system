import React from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    ClipboardSignature,
    Check,
    X,
    User,
    Calendar,
    Package,
    ArrowRight,
    Search,
} from "lucide-react";

function OrderRequest() {
    // ডামি অর্ডার রিকোয়েস্ট ডাটা
    const pendingRequests = [
        {
            id: "REQ-4401",
            buyer: "Fashion Tex Ltd.",
            product: "Summer Polo Shirts",
            qty: "5000 Pcs",
            material: "Combed Cotton",
            date: "23 Apr, 2026",
            note: "Need high-quality stitching for export.",
        },
        {
            id: "REQ-4405",
            buyer: "Global Apparel",
            product: "Cargo Pants Olive",
            qty: "2000 Pcs",
            material: "Twill Fabric",
            date: "22 Apr, 2026",
            note: "Standard labeling required.",
        },
        {
            id: "REQ-4409",
            buyer: "Eco Styles",
            product: "Kids Hoodie Pack",
            qty: "1200 Pcs",
            material: "Fleece Fabric",
            date: "21 Apr, 2026",
            note: "Urgent delivery needed.",
        },
    ];

    return (
        <ProductionLayout>
            <Head title="Order Requests | Production" />

            <div className="p-6 max-w-[1400px] mx-auto">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                                <ClipboardSignature
                                    className="text-amber-500"
                                    size={30}
                                />
                            </div>
                            <div>
                                Incoming Requests
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                                    Review buyer orders and initiate production
                                    workflow
                                </p>
                            </div>
                        </h1>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="w-full bg-[#0F1219] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-bold text-sm shadow-2xl"
                        />
                    </div>
                </div>

                {/* Requests List */}
                <div className="space-y-6">
                    {pendingRequests.length > 0 ? (
                        pendingRequests.map((req, i) => (
                            <motion.div
                                key={req.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl hover:border-amber-500/20 transition-all group relative overflow-hidden"
                            >
                                <div className="flex flex-col xl:flex-row justify-between gap-10 relative z-10">
                                    {/* Column 1: Order Details */}
                                    <div className="flex items-start gap-6 xl:w-[35%]">
                                        <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-amber-500 transition-all duration-500 shadow-xl">
                                            <Package
                                                className="text-slate-400 group-hover:text-black transition-colors"
                                                size={28}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-black text-xl uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                                                {req.product}
                                            </h3>
                                            <div className="flex gap-3 mt-2">
                                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                    ID: {req.id}
                                                </span>
                                                <span className="text-amber-500/80 text-[10px] font-black uppercase flex items-center gap-1">
                                                    <User size={12} />{" "}
                                                    {req.buyer}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-slate-500 text-xs font-medium leading-relaxed italic border-l-2 border-white/5 pl-4">
                                                "{req.note}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Column 2: Specs Mapping */}
                                    <div className="flex-1 flex items-center justify-center bg-white/[0.02] rounded-[2rem] p-6 border border-white/5">
                                        <div className="grid grid-cols-3 gap-10 w-full text-center">
                                            <div>
                                                <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1">
                                                    Target Quantity
                                                </p>
                                                <p className="text-white font-black text-sm uppercase">
                                                    {req.qty}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-center text-slate-800">
                                                <ArrowRight size={24} />
                                            </div>
                                            <div>
                                                <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1">
                                                    Raw Material
                                                </p>
                                                <p className="text-slate-300 font-bold text-sm uppercase">
                                                    {req.material}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column 3: Actions */}
                                    <div className="flex flex-row xl:flex-col items-center justify-center gap-4 min-w-[220px]">
                                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase mb-2">
                                            <Calendar size={14} /> {req.date}
                                        </div>
                                        <div className="flex gap-3 w-full">
                                            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95 uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                                                <Check size={16} /> Approve
                                            </button>
                                            <button className="px-5 bg-white/5 hover:bg-red-600/10 text-slate-500 hover:text-red-500 border border-white/5 hover:border-red-500/20 rounded-2xl transition-all">
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Background Accent Icon */}
                                <ClipboardSignature
                                    className="absolute -bottom-6 -right-6 text-white/[0.02] rotate-12 group-hover:text-amber-500/[0.03] transition-colors"
                                    size={200}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-[#0F1219]/40 border border-dashed border-white/10 rounded-[3rem]">
                            <p className="text-slate-600 font-black uppercase tracking-[0.2em]">
                                No new order requests found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </ProductionLayout>
    );
}

export default OrderRequest;
