import React from "react";
import { Search, Box } from "lucide-react";

export default function AllOrderHeader({
    totalRecords,
    searchTerm,
    onSearchChange,
}) {
    return (
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
            <div>
                <h1 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                    <Box className="text-indigo-500" size={32} />
                    Order Master List
                </h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                    Total Records: {totalRecords} • Search by ID
                </p>
            </div>

            <div className="relative w-full md:w-96 group">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="Enter Order ID (e.g. 1, 2, 5)..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-[#0F1219] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm shadow-2xl"
                />
            </div>
        </div>
    );
}
