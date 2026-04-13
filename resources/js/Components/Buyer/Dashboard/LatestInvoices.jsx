import React from "react";
import { FileText } from "lucide-react";

const invoices = ["Inv-2024-01", "Inv-2024-02"];

function LatestInvoices() {
    return (
        <div className="bg-[#080B11] border border-white/5 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-white mb-4">
                Latest Invoices
            </h2>
            <div className="space-y-4">
                {invoices.map((inv, i) => (
                    <div
                        key={i}
                        className="flex justify-between items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                <FileText size={16} />
                            </div>
                            <span className="text-sm font-semibold text-slate-300">
                                {inv}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-blue-500">
                            Download
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LatestInvoices;
