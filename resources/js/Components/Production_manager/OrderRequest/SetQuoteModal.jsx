import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Send } from "lucide-react";

export default function SetQuoteModal({
    isOpen,
    onClose,
    selectedOrder,
    data,
    setData,
    onSubmit,
    processing,
}) {
    if (!selectedOrder) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-[#0F1219] border border-amber-500/20 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                                <DollarSign
                                    className="text-amber-500"
                                    size={30}
                                />
                            </div>
                            <h2 className="text-2xl font-black uppercase text-white tracking-tight">
                                Set Quotation
                            </h2>
                            <p className="text-slate-500 text-[10px] font-black uppercase mt-1">
                                #ORD-{selectedOrder.id}
                            </p>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">
                                    Total Amount ($)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        autoFocus
                                        required
                                        step="0.01"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-amber-500 font-black text-2xl transition-all"
                                        value={data.total_amount}
                                        onChange={(e) =>
                                            setData(
                                                "total_amount",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 font-black uppercase text-xs">
                                        USD
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-4 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-[2] bg-amber-500 hover:bg-amber-600 text-black font-black py-4 rounded-2xl shadow-xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
                                >
                                    <Send size={14} /> Send Quote
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
