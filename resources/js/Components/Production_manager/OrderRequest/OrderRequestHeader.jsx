import React from "react";
import { ClipboardSignature, Search } from "lucide-react";

export default function OrderRequestHeader({ searchTerm, onSearchChange }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <ClipboardSignature className="text-amber-500" /> Incoming
                Requests
            </h1>
            <div className="relative w-full md:w-80">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Search Order ID..."
                    className="w-full bg-[#0F1219] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50 transition-all font-bold"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
}
