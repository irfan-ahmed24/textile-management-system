import React from "react";
import { CreditCard, Banknote } from "lucide-react";

export default function PaymentMethodSwitcher({
    paymentMethod,
    setPaymentMethod,
}) {
    return (
        <div className="flex justify-center mb-10">
            <div className="bg-[#0F1219] p-1.5 rounded-2xl border border-white/5 flex gap-2">
                <button
                    onClick={() => setPaymentMethod("stripe")}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                        paymentMethod === "stripe"
                            ? "bg-indigo-600 text-white shadow-lg"
                            : "text-slate-500 hover:text-white"
                    }`}
                >
                    <CreditCard size={14} /> Stripe / Card
                </button>
                <button
                    onClick={() => setPaymentMethod("manual")}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                        paymentMethod === "manual"
                            ? "bg-amber-600 text-white shadow-lg"
                            : "text-slate-500 hover:text-white"
                    }`}
                >
                    <Banknote size={14} /> Manual / Bank
                </button>
            </div>
        </div>
    );
}
