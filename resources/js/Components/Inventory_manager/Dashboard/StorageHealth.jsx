import React from "react";
import { motion } from "framer-motion";
import { Boxes } from "lucide-react";

export default function StorageHealth({ sections }) {
    return (
        <div className="bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Boxes className="text-emerald-500" size={20} /> Storage Health
            </h2>
            <div className="space-y-6">
                {sections.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs font-bold mb-2">
                            <span className="text-slate-500">
                                {item.section}
                            </span>
                            <span className={item.color}>
                                {item.percent}% Full
                            </span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percent}%` }}
                                className={`h-full ${item.barColor}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
