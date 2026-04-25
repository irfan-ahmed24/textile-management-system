import React from "react";
import { Layers } from "lucide-react";

export default function QuickActionCard() {
    return (
        <div className="bg-gradient-to-br from-indigo-600/20 to-transparent border border-indigo-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
            <div className="relative z-10">
                <h2 className="text-lg font-black text-white uppercase tracking-tight mb-2">
                    Update Progress
                </h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6 leading-relaxed">
                    Quickly update manufacturing stages for buyers.
                </p>
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[10px] transition-all shadow-xl shadow-indigo-600/20 uppercase tracking-[0.2em]">
                    Go to production line
                </button>
            </div>
            <Layers
                size={100}
                className="absolute -right-4 -bottom-4 text-white opacity-5 group-hover:rotate-12 transition-all duration-700"
            />
        </div>
    );
}
