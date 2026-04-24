import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Hash, DollarSign, Send, CheckCircle } from "lucide-react";

export default function PaymentFormCard({
    handleSubmit,
    data,
    setData,
    paymentMethod,
    processing,
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                            <Hash size={12} /> Order ID
                        </label>
                        <input
                            type="text"
                            required
                            value={data.order_id}
                            onChange={(e) =>
                                setData("order_id", e.target.value)
                            }
                            placeholder="Order ID"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 font-bold"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                            <DollarSign size={12} /> Amount
                        </label>
                        <input
                            type="number"
                            required
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 font-bold"
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {paymentMethod === "stripe" ? (
                        <motion.div
                            key="stripe-form"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-4"
                        >
                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                <CreditCard size={12} /> Card Details
                            </label>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 min-h-[60px] flex items-center text-slate-500 italic text-sm">
                                Stripe Elements Container Here
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="manual-form"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-4"
                        >
                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-4">
                                <p className="text-[10px] text-amber-500 font-black uppercase mb-1">
                                    Bank Info:
                                </p>
                                <p className="text-xs text-slate-300 leading-tight">
                                    Bank: DBBL | Acc: 123-456-7890
                                    <br />
                                    Bkash/Nagad: 01700-000000
                                </p>
                            </div>
                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                <CheckCircle size={12} /> Transaction ID /
                                Reference
                            </label>
                            <input
                                type="text"
                                required
                                value={data.transaction_id}
                                onChange={(e) =>
                                    setData("transaction_id", e.target.value)
                                }
                                placeholder="e.g. TRX99887766"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500 font-bold"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    disabled={processing}
                    type="submit"
                    className={`w-full font-black py-5 rounded-2xl shadow-xl transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 ${
                        paymentMethod === "stripe"
                            ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"
                            : "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                    }`}
                >
                    <Send size={18} />
                    {processing
                        ? "Processing..."
                        : `Submit ${paymentMethod === "stripe" ? "Card" : "Manual"} Payment`}
                </button>
            </form>
        </motion.div>
    );
}
