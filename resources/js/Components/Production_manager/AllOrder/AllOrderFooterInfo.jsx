import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function AllOrderFooterInfo() {
    return (
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-600">
            <CheckCircle2 size={16} className="text-indigo-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-center">
                Master Records Syncing with Database Node-01 • Secure Access
                Only
            </p>
        </div>
    );
}
