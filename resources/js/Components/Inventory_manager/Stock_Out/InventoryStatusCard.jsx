import React from "react";
import { ClipboardList } from "lucide-react";

export default function InventoryStatusCard({ items }) {
    return (
        <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
                <ClipboardList className="text-blue-500" size={24} />
                <h3 className="text-white font-black uppercase text-sm tracking-widest">
                    Inventory Status
                </h3>
            </div>
            <div className="space-y-4">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex justify-between items-center py-3 border-b border-white/5"
                    >
                        <span className="text-slate-500 text-xs font-bold uppercase">
                            {item.label}
                        </span>
                        <span className={item.valueClass}>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
