import React, { useState } from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RefreshCcw, Layers, X, Search, Building2 } from "lucide-react";
// ডাটা ইমপোর্ট
import { runningOrders, baseStages } from "@/Data/AllOrder";

function RunningOrder() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = runningOrders.filter(
        (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.ordered_by.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const openUpdateModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    return (
        <ProductionLayout>
            <Head title="Running Orders" />
            <div className="p-6 max-w-[1400px] mx-auto">
                {/* Header & Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                            Active Production
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                            Manage live order progress
                        </p>
                    </div>
                    <div className="relative w-full md:w-80 group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search Order ID or Buyer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0F1219] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-bold text-sm shadow-2xl"
                        />
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => {
                            const progress = Math.round(
                                (parseInt(order.completed) /
                                    parseInt(order.total_qty)) *
                                    100,
                            );
                            const currentStageName = baseStages.find(
                                (s) => s.id === order.currentStageId,
                            )?.name;

                            return (
                                <motion.div
                                    layout
                                    key={order.id}
                                    className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-6 hover:border-emerald-500/20 transition-all group shadow-xl"
                                >
                                    <div className="flex flex-col lg:flex-row items-center gap-8">
                                        {/* Column 1: Product Info */}
                                        <div className="flex items-center gap-4 w-full lg:w-[30%]">
                                            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shrink-0">
                                                <Play
                                                    size={18}
                                                    className="text-emerald-500 fill-emerald-500"
                                                />
                                            </div>
                                            <div className="truncate">
                                                <h3 className="text-white font-black text-sm uppercase truncate">
                                                    {order.product}
                                                </h3>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-slate-500 text-[9px] font-black uppercase bg-white/5 px-2 py-0.5 rounded">
                                                        {order.id}
                                                    </span>
                                                    <span className="text-emerald-500/80 text-[9px] font-black uppercase flex items-center gap-1">
                                                        <Layers size={10} />{" "}
                                                        {currentStageName}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Column 2: Order By */}
                                        <div className="w-full lg:w-[20%] border-l border-white/5 pl-8">
                                            <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1">
                                                Ordered By
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Building2
                                                    size={14}
                                                    className="text-indigo-500"
                                                />
                                                <span className="text-slate-300 font-bold text-xs uppercase">
                                                    {order.ordered_by}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Column 3: Progress Bar */}
                                        <div className="flex-1 w-full border-l border-white/5 pl-8">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-slate-600 text-[10px] font-black uppercase">
                                                    Progress
                                                </span>
                                                <span className="text-white text-[10px] font-black">
                                                    {progress}%
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Column 4: Action */}
                                        <button
                                            onClick={() =>
                                                openUpdateModal(order)
                                            }
                                            className="px-6 py-3 bg-white/5 hover:bg-emerald-600 text-slate-300 hover:text-white text-[10px] font-black uppercase rounded-xl border border-white/5 transition-all flex items-center gap-2"
                                        >
                                            <RefreshCcw size={14} /> Update
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 bg-[#0F1219]/50 border border-dashed border-white/10 rounded-[2.5rem]">
                            <p className="text-slate-600 font-black uppercase tracking-widest">
                                No matching orders found
                            </p>
                        </div>
                    )}
                </div>

                {/* --- UPDATE MODAL SECTION --- */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative bg-[#0F1219] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl z-50"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                            Update Status
                                        </h2>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase mt-1">
                                            Buyer:{" "}
                                            <span className="text-indigo-400">
                                                {selectedOrder?.ordered_by}
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-slate-500 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form className="space-y-6 text-left">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                            Current Manufacturing Stage
                                        </label>
                                        <select
                                            defaultValue={
                                                selectedOrder?.currentStageId
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 mt-2 font-bold text-sm uppercase appearance-none"
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
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                            Production Note for Buyer
                                        </label>
                                        <textarea
                                            placeholder="Write a short update..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 mt-2 h-24 resize-none text-sm font-medium"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-600/20 uppercase text-[10px] tracking-widest transition-all active:scale-95"
                                    >
                                        Push Update to Buyer
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </ProductionLayout>
    );
}

export default RunningOrder;
