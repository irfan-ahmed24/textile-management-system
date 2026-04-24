import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PaymentInfoPanel({ paymentMethod, data }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/5 rounded-[2.5rem] p-8">
                <ShieldCheck className="text-indigo-500 mb-4" size={40} />
                <h3 className="text-xl font-black uppercase text-white mb-2">
                    Safe Verification
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    {paymentMethod === "stripe"
                        ? "Your card payment is instant and encrypted via Stripe's global network."
                        : "Manual payments are reviewed by our production managers within 1-2 hours. Please provide a valid transaction ID."}
                </p>
            </div>

            <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-8">
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Order ID</span>
                        <span className="text-white font-bold">
                            {data.order_id ? `#ORD-${data.order_id}` : "---"}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Method</span>
                        <span className="text-indigo-400 font-bold uppercase text-[10px]">
                            {paymentMethod}
                        </span>
                    </div>
                    <div className="h-px bg-white/5 my-2"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-black uppercase text-white">
                            Amount
                        </span>
                        <span className="text-2xl font-black text-indigo-500">
                            ${data.amount || "0.00"}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
