import React from "react";
import { Lock } from "lucide-react";

export default function PaymentHeader() {
    return (
        <div className="text-center mb-10">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
                Secure Checkout
            </h1>
            <div className="flex justify-center gap-4">
                <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                    <Lock size={14} className="text-emerald-500" /> Secure
                    Encryption
                </p>
            </div>
        </div>
    );
}
