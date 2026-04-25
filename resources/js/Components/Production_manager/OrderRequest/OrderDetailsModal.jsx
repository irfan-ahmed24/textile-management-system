import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    User,
    Ruler,
    AlertCircle,
    Calendar,
    Info,
    Check,
} from "lucide-react";

export default function OrderDetailsModal({
    isOpen,
    onClose,
    selectedOrder,
    onApprove,
}) {
    if (!selectedOrder) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-[#0F1219] border border-white/10 w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                                    Full Order Data
                                </h2>
                                <div className="flex gap-4 mt-2">
                                    <span className="text-amber-500 font-black text-xs uppercase">
                                        #ORD-{selectedOrder.id}
                                    </span>
                                    <span className="text-slate-400 font-black text-xs uppercase flex items-center gap-1">
                                        <User size={12} /> Buyer ID:{" "}
                                        {selectedOrder.user_id}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 bg-white/5 rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                    <h4 className="text-[10px] font-black uppercase text-amber-500 mb-4 flex items-center gap-2">
                                        <Ruler size={14} /> Size Measurements
                                    </h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {selectedOrder.size_breakdown &&
                                            Object.entries(
                                                selectedOrder.size_breakdown,
                                            ).map(([size, qty]) => (
                                                <div
                                                    key={size}
                                                    className="bg-black/40 p-3 rounded-2xl text-center border border-white/5"
                                                >
                                                    <p className="text-slate-500 text-[10px] font-black">
                                                        {size}
                                                    </p>
                                                    <p className="text-white font-black">
                                                        {qty}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                                        <p className="text-slate-500 text-[9px] font-black uppercase mb-1 flex items-center gap-1">
                                            <AlertCircle
                                                size={10}
                                                className="text-red-500"
                                            />{" "}
                                            Priority
                                        </p>
                                        <p className="text-white font-black text-xs uppercase tracking-wider">
                                            {selectedOrder.priority_level}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                                        <p className="text-slate-500 text-[9px] font-black uppercase mb-1 flex items-center gap-1">
                                            <Calendar
                                                size={10}
                                                className="text-indigo-400"
                                            />{" "}
                                            Delivery
                                        </p>
                                        <p className="text-white font-black text-xs">
                                            {selectedOrder.target_delivery}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                    <p className="text-slate-500 text-[9px] font-black uppercase mb-1 tracking-[0.2em]">
                                        Manual Payment Verification
                                    </p>

                                    {selectedOrder.payment?.transaction_id ? (
                                        <div className="mt-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                            <p className="text-[10px] text-emerald-500 font-bold uppercase">
                                                Transaction ID:
                                            </p>
                                            <p className="text-white font-black text-sm select-all">
                                                {
                                                    selectedOrder.payment
                                                        .transaction_id
                                                }
                                            </p>
                                            <p className="text-[9px] text-slate-500 mt-1 italic font-medium">
                                                * Check statement before
                                                approving.
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 text-xs mt-2 italic">
                                            No manual payment submitted yet.
                                        </p>
                                    )}

                                    <div className="flex justify-between items-center mt-6">
                                        <h3
                                            className={`text-xl font-black uppercase ${selectedOrder.payment_status === "paid" ? "text-emerald-500" : "text-amber-500"}`}
                                        >
                                            {selectedOrder.payment_status}
                                        </h3>
                                        <div className="text-right">
                                            <p className="text-white font-black text-sm">
                                                ${selectedOrder.total_amount}
                                            </p>
                                            <p className="text-[9px] text-slate-600 font-bold uppercase">
                                                Payable Amount
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {(selectedOrder.payment?.transaction_id ||
                                    selectedOrder.payment_status ===
                                        "paid") && (
                                    <button
                                        onClick={() =>
                                            onApprove(selectedOrder.id)
                                        }
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
                                    >
                                        <Check size={16} /> Confirm Payment &
                                        Start Production
                                    </button>
                                )}
                                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                    <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-2 flex items-center gap-2">
                                        <Info size={14} /> Production Note
                                    </h4>
                                    <p className="text-slate-400 text-sm italic">
                                        "
                                        {selectedOrder.special_instructions ||
                                            "N/A"}
                                        "
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
