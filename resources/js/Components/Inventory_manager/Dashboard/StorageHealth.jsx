import React from "react";
import { motion } from "framer-motion";
import { Boxes, Zap } from "lucide-react";

export default function StorageHealth({ sections = [] }) {
    return (
        <div className="bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                    <Boxes className="text-emerald-500" size={20} /> Storage
                    Health
                </h2>
                <Zap size={16} className="text-slate-600" />
            </div>

            <div className="space-y-8">
                {sections.length > 0 ? (
                    sections.map((item, i) => (
                        <div key={i} className="group">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.1em] mb-3">
                                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                                    {item.label}
                                </span>
                                <span
                                    className={item.color.replace(
                                        "bg-",
                                        "text-",
                                    )}
                                >
                                    {item.value}% Capacity
                                </span>
                            </div>

                            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.value}%` }}
                                    transition={{
                                        duration: 1,
                                        ease: "easeOut",
                                        delay: i * 0.1,
                                    }}
                                    className={`h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${item.color}`}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                            No storage data available
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-600 font-bold uppercase leading-relaxed">
                    * Analytics based on total warehouse volume against current
                    stock levels.
                </p>
            </div>
        </div>
    );
}
