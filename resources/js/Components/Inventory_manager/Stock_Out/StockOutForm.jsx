import React from "react";
import { motion } from "framer-motion";
import { Hash, Truck, User, Weight, ArrowUpRight, Loader2 } from "lucide-react";

export default function StockOutForm({
    data,
    setData,
    submit,
    processing,
    errors,
    reasons,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl"
        >
            <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Item Code */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                            Item Code
                        </label>
                        <div className="relative group">
                            <Hash
                                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.item_code ? "text-red-500" : "text-slate-600"}`}
                                size={18}
                            />
                            <input
                                type="text"
                                required
                                value={data.item_code}
                                onChange={(e) =>
                                    setData("item_code", e.target.value)
                                }
                                className={`w-full bg-white/5 border ${errors.item_code ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-red-500/40 transition-all`}
                                placeholder="Enter or scan code"
                            />
                        </div>
                        {errors.item_code && (
                            <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">
                                {errors.item_code}
                            </p>
                        )}
                    </div>

                    {/* Recipient */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                            Recipient / Dept.
                        </label>
                        <div className="relative">
                            <User
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                size={18}
                            />
                            <input
                                type="text"
                                required
                                value={data.recipient}
                                onChange={(e) =>
                                    setData("recipient", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-red-500/40 transition-all"
                                placeholder="e.g. Dyeing Unit / Buyer Name"
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                            Quantity to Remove
                        </label>
                        <div className="relative">
                            <Weight
                                className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.quantity ? "text-red-500" : "text-slate-600"}`}
                                size={18}
                            />
                            <input
                                type="number"
                                required
                                min="0.01"
                                step="0.01"
                                value={data.quantity}
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                className={`w-full bg-white/5 border ${errors.quantity ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-red-500/40 transition-all`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.quantity && (
                            <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">
                                {errors.quantity}
                            </p>
                        )}
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                            Reason
                        </label>
                        <div className="relative">
                            <Truck
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                size={18}
                            />
                            <select
                                required
                                value={data.reason}
                                onChange={(e) =>
                                    setData("reason", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white appearance-none focus:outline-none focus:border-red-500/40 transition-all"
                            >
                                <option value="" className="bg-[#0F1219]">
                                    Select Reason
                                </option>
                                {reasons.map((reason) => (
                                    <option
                                        key={reason.value}
                                        value={reason.value}
                                        className="bg-[#0F1219]"
                                    >
                                        {reason.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                        Reference / Note
                    </label>
                    <textarea
                        value={data.note}
                        onChange={(e) => setData("note", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white h-24 focus:outline-none focus:border-red-500/40 transition-all resize-none"
                        placeholder="Add any internal reference number or instructions..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {processing ? (
                        <>
                            <Loader2 className="animate-spin" size={22} />
                            Updating Inventory...
                        </>
                    ) : (
                        <>
                            Complete Stock Out
                            <ArrowUpRight size={22} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}
