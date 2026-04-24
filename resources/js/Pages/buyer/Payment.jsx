import React, { useState } from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    Hash,
    DollarSign,
    ShieldCheck,
    Lock,
    Send,
    Banknote,
    CheckCircle,
} from "lucide-react";

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState("stripe"); // stripe or manual

    const { data, setData, post, processing, errors } = useForm({
        order_id: "",
        amount: "",
        transaction_id: "", // ম্যানুয়াল পেমেন্টের জন্য
        payment_type: "stripe",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // ব্যাকএন্ডে ডাটা পাঠানোর সময় payment_type সেট করে দিচ্ছি
        data.payment_type = paymentMethod;
        post(route("buyer.payment.process"));
    };

    return (
        <BuyerLayout>
            <Head title="Secure Payment" />

            <div className="p-6 max-w-[1100px] mx-auto text-white">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
                        Secure Checkout
                    </h1>
                    <div className="flex justify-center gap-4">
                        <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                            <Lock size={14} className="text-emerald-500" />{" "}
                            Secure Encryption
                        </p>
                    </div>
                </div>

                {/* --- Payment Method Switcher --- */}
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

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Left Side: Form */}
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
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
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
                                            <CreditCard size={12} /> Card
                                            Details
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
                                            <CheckCircle size={12} />{" "}
                                            Transaction ID / Reference
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.transaction_id}
                                            onChange={(e) =>
                                                setData(
                                                    "transaction_id",
                                                    e.target.value,
                                                )
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

                    {/* Right Side: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/5 rounded-[2.5rem] p-8">
                            <ShieldCheck
                                className="text-indigo-500 mb-4"
                                size={40}
                            />
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
                                    <span className="text-slate-400">
                                        Order ID
                                    </span>
                                    <span className="text-white font-bold">
                                        {data.order_id
                                            ? `#ORD-${data.order_id}`
                                            : "---"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">
                                        Method
                                    </span>
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
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Payment;
