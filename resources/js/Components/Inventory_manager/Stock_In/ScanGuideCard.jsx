import React from "react";
import { ScanLine } from "lucide-react";

export default function ScanGuideCard() {
    return (
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-4">
                <ScanLine className="text-indigo-500" size={24} />
                <h3 className="text-white font-black uppercase text-sm tracking-widest">
                    How to Scan?
                </h3>
            </div>
            <ul className="space-y-4">
                <li className="flex gap-3 text-slate-400 text-xs leading-relaxed">
                    <span className="text-indigo-500 font-black">01.</span>
                    Click the "Launch QR Scanner" button above.
                </li>
                <li className="flex gap-3 text-slate-400 text-xs leading-relaxed">
                    <span className="text-indigo-500 font-black">02.</span>
                    Allow camera access and point at the item's QR code.
                </li>
                <li className="flex gap-3 text-slate-400 text-xs leading-relaxed">
                    <span className="text-indigo-500 font-black">03.</span>
                    Data will auto-fill; just enter the quantity and confirm.
                </li>
            </ul>
        </div>
    );
}
