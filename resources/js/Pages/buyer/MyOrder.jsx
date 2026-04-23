import React, { useState } from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    X,
    Plus,
    ShoppingBag,
    Calendar,
    Send,
    Ruler,
    AlertTriangle,
    Layers,
    Type, // Fabric টাইপ বোঝাতে আইকন
} from "lucide-react";
// ডাটা ইমপোর্ট
import { runningOrders } from "@/Data/AllOrder";

function MyOrder() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    // সার্চ ফিল্টার
    const filteredOrders = runningOrders.filter(
        (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <BuyerLayout>
            <Head title="My Orders" />

            <div className="p-6 max-w-[1200px] mx-auto text-white">
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                            <ShoppingBag className="text-indigo-500" /> Order
                            History
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase mt-1">
                            Manage and request garment production
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search Orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#161b22] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setIsOrderModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                            <Plus size={16} /> New Order Request
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-[#0F1219] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <th className="px-6 py-4">Order Details</th>
                                <th className="px-6 py-4">Placement Date</th>
                                <th className="px-6 py-4">Quantity</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4 leading-tight">
                                        <span className="text-sm font-black uppercase text-white block">
                                            {order.product}
                                        </span>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase">
                                            ID: #ORD-{order.id}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-400">
                                        {order.lastUpdate || "23 Apr, 2026"}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-300">
                                        {order.total_qty} Pcs
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-indigo-400">
                                        {order.amount || "$0.00"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span
                                            className={`text-[9px] px-3 py-1 rounded-full font-black uppercase border ${
                                                order.currentStageId >= 5
                                                    ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                                                    : "text-amber-500 border-amber-500/20 bg-amber-500/5"
                                            }`}
                                        >
                                            {order.currentStageId >= 5
                                                ? "Completed"
                                                : "In Production"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- NEW ORDER MODAL --- */}
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
                                            />{" "}
                                            New Production Order
                                        </h2>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">
                                            Specify manufacturing details
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setIsOrderModalOpen(false)
                                        }
                                        className="text-slate-500 hover:text-white p-2 bg-white/5 rounded-xl transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form className="space-y-6">
                                    {/* Row 1: Product Name & Fabric Type (Updated) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Slim Fit Denim"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                                <Layers size={12} /> Fabric Type
                                            </label>
                                            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold appearance-none cursor-pointer">
                                                <option className="bg-[#0F1219]">
                                                    Single Jersey (Cotton)
                                                </option>
                                                <option className="bg-[#0F1219]">
                                                    Denim (12oz/14oz)
                                                </option>
                                                <option className="bg-[#0F1219]">
                                                    Pique Polo Fabric
                                                </option>
                                                <option className="bg-[#0F1219]">
                                                    Fleece (Winter)
                                                </option>
                                                <option className="bg-[#0F1219]">
                                                    Twill Fabric
                                                </option>
                                                <option className="bg-[#0F1219]">
                                                    Polyester / Mesh
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 2: Quantity & Priority */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                                Total Quantity (Pcs)
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="1000"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                                <AlertTriangle size={12} />{" "}
                                                Priority Level
                                            </label>
                                            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold appearance-none cursor-pointer">
                                                <option className="bg-[#0F1219]">
                                                    Standard Delivery
                                                </option>
                                                <option className="bg-[#0F1219]">
                                                    Medium Priority
                                                </option>
                                                <option className="bg-[#0F1219]">
                                                    Urgent / High Priority
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 3: Target Date & Size Breakdown */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                                <Calendar size={12} /> Target
                                                Delivery
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                                <Ruler size={12} /> Size
                                                Breakdown
                                            </label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {["S", "M", "L", "XL"].map(
                                                    (size) => (
                                                        <div
                                                            key={size}
                                                            className="relative"
                                                        >
                                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-600">
                                                                {size}
                                                            </span>
                                                            <input
                                                                type="number"
                                                                placeholder="0"
                                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-6 pr-1 text-white focus:outline-none focus:border-indigo-500 text-[10px] font-bold"
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 4: Fabric & Instructions */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                            Special Production Instructions
                                        </label>
                                        <textarea
                                            placeholder="Write about fabric GSM, color shades, or wash requirements..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 text-sm font-medium h-24 resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <Send size={16} /> Submit Order Request
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </BuyerLayout>
    );
}

export default MyOrder;
