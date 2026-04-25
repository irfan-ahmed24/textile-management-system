import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, X, MessageSquare } from "lucide-react";

export default function UpdateStatusModal({
    isOpen,
    onClose,
    onSubmit,
    baseStages = [],
    data,
    setData,
    errors,
    processing,
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-[#0F1219] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
                    >
                        <div className="flex justify-between mb-6">
                            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <RefreshCcw
                                    className="text-emerald-500"
                                    size={20}
                                />
                                Update Status
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    Current Manufacturing Stage
                                </label>
                                <select
                                    value={data.current_stage_id}
                                    onChange={(e) =>
                                        setData(
                                            "current_stage_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-emerald-500 mt-2 font-bold text-sm uppercase appearance-none cursor-pointer"
                                >
                                    {baseStages.map((s) => (
                                        <option
                                            key={s.id}
                                            value={s.id}
                                            className="bg-[#0F1219]"
                                        >
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.current_stage_id && (
                                    <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                                        {errors.current_stage_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1">
                                    <MessageSquare size={12} /> Note for Buyer
                                    (Admin Note)
                                </label>
                                <textarea
                                    value={data.admin_note}
                                    onChange={(e) =>
                                        setData("admin_note", e.target.value)
                                    }
                                    placeholder="Example: Yarn quality checked. Knitting will start tomorrow."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-emerald-500 mt-2 h-32 resize-none text-sm font-medium"
                                ></textarea>
                                {errors.admin_note && (
                                    <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                                        {errors.admin_note}
                                    </p>
                                )}
                            </div>

                            <button
                                disabled={processing}
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/20 uppercase text-[11px] tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {processing
                                    ? "Sending Update..."
                                    : "Push Update to Buyer"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
