import React from "react";
import { AlertTriangle, PlusCircle, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function CriticalLowStock({ items = [] }) {
    return (
        <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 text-red-500">
                <div className="flex items-center gap-3">
                    <AlertTriangle size={24} className="animate-pulse" />
                    <h2 className="text-lg font-bold text-white uppercase tracking-tight">
                        Critical Low Stock
                    </h2>
                </div>
            </div>

            <div className="space-y-4">
                {items.length > 0 ? (
                    items.map((item, i) => (
                        <div
                            key={i}
                            className="p-4 rounded-2xl bg-[#0F1219]/50 border border-white/5 flex justify-between items-center group hover:border-red-500/30 transition-all duration-300"
                        >
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-200 group-hover:text-red-400 transition-colors uppercase">
                                    {item.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                        Remaining:
                                    </span>
                                    <span className="text-xs text-red-500 font-black">
                                        {item.stock} {item.unit}
                                    </span>
                                </div>
                            </div>

                            {/* সরাসরি রি-স্টক (Stock In) পেজে যাওয়ার বাটন */}
                            <Link
                                href={route("inventory.stockIn")}
                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5 active:scale-95"
                            >
                                <PlusCircle size={18} />
                            </Link>
                        </div>
                    ))
                ) : (
                    /* যদি কোনো লো স্টক আইটেম না থাকে */
                    <div className="py-6 text-center">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            ✅ All materials safe
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
