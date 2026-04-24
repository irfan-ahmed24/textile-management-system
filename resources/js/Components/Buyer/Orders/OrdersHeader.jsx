import React from "react";
import { Search, Plus, ShoppingBag } from "lucide-react";

export default function OrdersHeader({
    searchTerm,
    setSearchTerm,
    setIsOrderModalOpen,
}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <ShoppingBag className="text-indigo-500" /> Order History
                </h1>
                <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">
                    Manage production requests & secure payments
                </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                        size={16}
                    />
                    <input
                        type="text"
                        placeholder="Search by ID or Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#161b22] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    />
                </div>
                <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                    <Plus size={16} /> New Request
                </button>
            </div>
        </div>
    );
}
