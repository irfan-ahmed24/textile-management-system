import React from "react";
import { MinusCircle, ScanLine } from "lucide-react";

export default function StockOutHeader({ onOpenScanner }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-3">
                    <MinusCircle className="text-red-500" size={28} />
                    Inventory Issue (Stock Out)
                </h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                    Deduct stock for production or delivery
                </p>
            </div>

            <button
                onClick={onOpenScanner}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-600/20"
            >
                <ScanLine size={20} /> Scan Item to Remove
            </button>
        </div>
    );
}
