import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Plus,
    Calendar,
    Send,
    Ruler,
    AlertTriangle,
    Layers,
} from "lucide-react";

export default function NewOrderModal({
    isOrderModalOpen,
    setIsOrderModalOpen,
    handleSubmit,
    data,
    setData,
    processing,
}) {
    return (
        <AnimatePresence>
            {isOrderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOrderModalOpen(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-[#0F1219] border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl my-8"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                                    <Plus
                                        className="text-indigo-500"
                                        size={24}
                                    />
                                    New Production Order
                                </h2>
                                <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">
                                    Specify manufacturing details
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="text-slate-500 hover:text-white p-2 bg-white/5 rounded-xl transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.product_name}
                                        onChange={(e) =>
                                            setData(
                                                "product_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. Slim Fit Denim"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                        <Layers size={12} /> Fabric Type
                                    </label>
                                    <select
                                        value={data.fabric_type}
                                        onChange={(e) =>
                                            setData(
                                                "fabric_type",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold appearance-none cursor-pointer"
                                    >
                                        <option
                                            className="bg-[#0F1219]"
                                            value="Single Jersey (Cotton)"
                                        >
                                            Single Jersey (Cotton)
                                        </option>
                                        <option
                                            className="bg-[#0F1219]"
                                            value="Denim (12oz/14oz)"
                                        >
                                            Denim (12oz/14oz)
                                        </option>
                                        <option
                                            className="bg-[#0F1219]"
                                            value="Pique Polo Fabric"
                                        >
                                            Pique Polo Fabric
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Total Quantity (Pcs)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={data.total_quantity}
                                        onChange={(e) =>
                                            setData(
                                                "total_quantity",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="1000"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                        <AlertTriangle size={12} /> Priority
                                    </label>
                                    <select
                                        value={data.priority_level}
                                        onChange={(e) =>
                                            setData(
                                                "priority_level",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold appearance-none cursor-pointer"
                                    >
                                        <option
                                            className="bg-[#0F1219]"
                                            value="Standard Delivery"
                                        >
                                            Standard Delivery
                                        </option>
                                        <option
                                            className="bg-[#0F1219]"
                                            value="Urgent"
                                        >
                                            Urgent / High Priority
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                        <Calendar size={12} /> Target Delivery
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={data.target_delivery}
                                        onChange={(e) =>
                                            setData(
                                                "target_delivery",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold [color-scheme:dark]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                        <Ruler size={12} /> Sizes (S,M,L,XL)
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {["S", "M", "L", "XL"].map((size) => (
                                            <input
                                                key={size}
                                                type="number"
                                                placeholder={size}
                                                onChange={(e) =>
                                                    setData("size_breakdown", {
                                                        ...data.size_breakdown,
                                                        [size]: e.target.value,
                                                    })
                                                }
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 text-center text-white focus:outline-none focus:border-indigo-500 text-[10px] font-bold"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                    Special Instructions
                                </label>
                                <textarea
                                    value={data.special_instructions}
                                    onChange={(e) =>
                                        setData(
                                            "special_instructions",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Fabric GSM, color shades, or wash requirements..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-medium h-24 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                            >
                                <Send size={16} />
                                {processing
                                    ? "Submitting..."
                                    : "Submit Order Request"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
