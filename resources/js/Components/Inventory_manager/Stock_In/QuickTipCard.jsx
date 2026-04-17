import React from "react";
import { History } from "lucide-react";

export default function QuickTipCard() {
    return (
        <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
                <History className="text-blue-500" size={24} />
                <h3 className="text-white font-black uppercase text-sm tracking-widest">
                    Quick Tip
                </h3>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
                For Yarn batches, always check the Warehouse Location to
                maintain FIFO (First In First Out) system.
            </p>
        </div>
    );
}
