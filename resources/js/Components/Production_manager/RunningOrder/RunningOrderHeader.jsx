import React from "react";
import { Search } from "lucide-react";

export default function RunningOrderHeader({ searchTerm, onSearchChange }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                    Active Production
                </h1>
                <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">
                    Manage live order progress
                </p>
            </div>
            <div className="relative w-full md:w-80 group">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Search Order ID or Buyer..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-[#0F1219] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 font-bold text-sm shadow-2xl"
                />
            </div>
        </div>
    );
}
