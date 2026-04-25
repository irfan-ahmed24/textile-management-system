import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function LiveProductionLine({ liveProduction = [] }) {
    return (
        <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
                        <Play
                            className="text-amber-500 fill-amber-500"
                            size={18}
                        />
                        Active Production Line
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">
                        Live monitoring of orders on factory floor
                    </p>
                </div>
                <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-amber-500 uppercase tracking-widest border border-white/5 transition-all">
                    View All Orders
                </button>
            </div>

            <div className="space-y-8">
                {liveProduction.length > 0 ? (
                    liveProduction.map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
                                        {item.id} • {item.buyer}
                                    </span>
                                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-tight">
                                        {item.name}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest border ${
                                            item.priority === "High"
                                                ? "bg-red-500/10 text-red-500 border-red-500/20"
                                                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                        }`}
                                    >
                                        {item.priority} Priority
                                    </span>
                                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">
                                        {item.stage}: {item.progress}%
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.progress}%` }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeOut",
                                    }}
                                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-600 font-bold uppercase text-xs tracking-widest">
                        No orders in production line
                    </div>
                )}
            </div>
        </div>
    );
}
