import React from "react";
import { motion } from "framer-motion";
import {
    PlusCircle,
    Package,
    Hash,
    Tag,
    Weight,
    DollarSign,
    MapPin,
    Loader2, // লোডার আইকন যোগ করলাম
} from "lucide-react";

export default function StockInForm({
    data,
    setData,
    submit,
    processing,
    errors,
    categories,
    units,
}) {
    console.log(data);
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
                        <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                            Item Code / SKU
                        </label>
                        <div className="relative">
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
                                className={`w-full bg-white/5 border ${errors.item_code ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all`}
                                placeholder="Type or Scan code"
                            />
                        </div>
                        {errors.item_code && (
                            <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">
                                {errors.item_code}
                            </p>
                        )}
                    </div>

                    {/* Item Name */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                            Item Name
                        </label>
                        <div className="relative">
                            <Package
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                size={18}
                            />
                            <input
                                type="text"
                                required
                                value={data.item_name}
                                onChange={(e) =>
                                    setData("item_name", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                placeholder="Enter item name"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                            Category
                        </label>
                        <div className="relative">
                            <Tag
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                size={18}
                            />
                            <select
                                required
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-indigo-500/50 transition-all"
                            >
                                <option value="" className="bg-[#0F1219]">
                                    Select Category
                                </option>
                                {categories.map((cat) => (
                                    <option
                                        key={cat}
                                        value={cat}
                                        className="bg-[#0F1219]"
                                    >
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Warehouse Location */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                            Warehouse Location
                        </label>
                        <div className="relative">
                            <MapPin
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                size={18}
                            />
                            <input
                                type="text"
                                value={data.warehouse_location}
                                onChange={(e) =>
                                    setData(
                                        "warehouse_location",
                                        e.target.value,
                                    )
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                placeholder="e.g. Floor 1, Shelf A"
                            />
                        </div>
                    </div>

                    {/* Quantity & Unit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                Quantity
                            </label>
                            <div className="relative">
                                <Weight
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
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
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                Unit
                            </label>
                            <select
                                value={data.unit}
                                onChange={(e) =>
                                    setData("unit", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white appearance-none focus:outline-none focus:border-indigo-500/50 transition-all"
                            >
                                {units.map((u) => (
                                    <option
                                        key={u}
                                        value={u}
                                        className="bg-[#0F1219]"
                                    >
                                        {u}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Unit Price */}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                            Unit Price ($)
                        </label>
                        <div className="relative">
                            <DollarSign
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                size={18}
                            />
                            <input
                                type="number"
                                step="0.01"
                                value={data.unit_price}
                                onChange={(e) =>
                                    setData("unit_price", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {processing ? (
                        <>
                            <Loader2 className="animate-spin" size={22} />
                            Processing Entry...
                        </>
                    ) : (
                        <>
                            Complete Stock Entry
                            <PlusCircle size={22} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}
