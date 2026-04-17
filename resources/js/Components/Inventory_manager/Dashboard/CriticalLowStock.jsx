import React from "react";
import { AlertTriangle, PlusCircle } from "lucide-react";

export default function CriticalLowStock({ items }) {
    return (
        <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6 text-red-500">
                <AlertTriangle size={24} />
                <h2 className="text-lg font-bold text-white">
                    Critical Low Stock
                </h2>
            </div>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center"
                    >
                        <div>
                            <p className="text-sm font-bold text-slate-200">
                                {item.name}
                            </p>
                            <p className="text-xs text-red-400 mt-1 font-semibold">
                                {item.stock}
                            </p>
                        </div>
                        <button className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <PlusCircle size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
