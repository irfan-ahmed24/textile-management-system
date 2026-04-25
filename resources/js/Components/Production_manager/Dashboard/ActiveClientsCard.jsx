import React from "react";
import { ArrowRight, Users } from "lucide-react";

export default function ActiveClientsCard({ buyerSummary = [] }) {
    return (
        <div className="bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8">
            <h2 className="text-sm font-black text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
                <Users className="text-indigo-500" size={18} />
                Active Clients
            </h2>
            <div className="space-y-4">
                {buyerSummary.map((buyer, i) => (
                    <div
                        key={i}
                        className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all"
                    >
                        <div>
                            <p className="text-xs font-black text-slate-200 uppercase">
                                {buyer.name}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">
                                {buyer.orders} Running Orders
                            </p>
                        </div>
                        <ArrowRight size={14} className="text-slate-600" />
                    </div>
                ))}
            </div>
        </div>
    );
}
