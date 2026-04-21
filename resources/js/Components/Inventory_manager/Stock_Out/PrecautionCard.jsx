import React from "react";
import { AlertTriangle } from "lucide-react";

export default function PrecautionCard() {
    return (
        <div className="bg-red-600/5 border border-red-500/20 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-4 text-red-500">
                <AlertTriangle size={24} />
                <h3 className="font-black uppercase text-sm tracking-widest">
                    Precaution
                </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
                Once Stock-Out is confirmed, the quantity will be permanently
                deducted from the main warehouse. Double-check the
                <strong> Item Code</strong> before confirming.
            </p>
        </div>
    );
}
