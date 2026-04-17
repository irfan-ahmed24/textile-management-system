import React from "react";
import { PlusCircle, ScanLine } from "lucide-react";

export default function StockInHeader({ onOpenScanner }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-3">
                    <PlusCircle className="text-blue-500" size={28} />
                    Stock Entry
                </h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                    Manual Entry or Scan QR Code
                </p>
            </div>

            <button
                onClick={onOpenScanner}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
                <ScanLine size={20} /> Launch QR Scanner
            </button>
        </div>
    );
}
