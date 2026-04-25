import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatsGrid({ stats = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="bg-[#080B11] border border-white/5 p-6 rounded-[2rem] hover:border-amber-500/30 transition-all group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div
                            className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}
                        >
                            <stat.icon size={24} />
                        </div>
                        <TrendingUp size={16} className="text-slate-700" />
                    </div>
                    <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">
                        {stat.label}
                    </h3>
                    <p className="text-3xl font-black text-white mt-1">
                        {stat.value}
                    </p>
                    <p className="text-[10px] mt-2 text-slate-500 font-bold uppercase flex items-center gap-1">
                        {stat.detail}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
