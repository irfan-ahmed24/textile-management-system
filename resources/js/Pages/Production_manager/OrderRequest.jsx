import React, { useState } from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ClipboardSignature,
    Check,
    X,
    User,
    Calendar,
    Package,
    Search,
    Eye,
    DollarSign,
    Ruler,
    Info,
    CreditCard,
    Send,
    AlertCircle,
} from "lucide-react";

function OrderRequest({ runningOrders = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        total_amount: "",
        order_id: "",
    });

    const openDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    const openQuoteModal = (order) => {
        setSelectedOrder(order);
        setData("order_id", order.id);
        setIsQuoteModalOpen(true);
    };

    const handleSendQuote = (e) => {
        e.preventDefault();
        post(route("production.order-request.send-quote"), {
            onSuccess: () => {
                setIsQuoteModalOpen(false);
                reset();
            },
        });
    };

    const handleApprove = (id) => {
        if (confirm("Verify payment and start production for this order?")) {
            post(route("production.order-request.approve", id));
        }
    };

    const filteredOrders = runningOrders.filter(
        (order) =>
            order.id.toString().includes(searchTerm) ||
            order.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <ProductionLayout>
            <Head title="Order Requests" />

            <div className="p-6 max-w-[1400px] mx-auto text-white">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                        <ClipboardSignature className="text-amber-500" />{" "}
                        Incoming Requests
                    </h1>
                    <div className="relative w-full md:w-80">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search Order ID..."
                            className="w-full bg-[#0F1219] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50 transition-all font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-6 py-5">Product Name</th>
                                <th className="px-6 py-5 text-center">
                                    Quantity
                                </th>
                                <th className="px-6 py-5 text-center">
                                    Payment
                                </th>
                                <th className="px-8 py-5 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                                    onClick={() => openDetails(order)}
                                >
                                    <td className="px-8 py-6 font-black text-amber-500 text-sm">
                                        #ORD-{order.id}
                                    </td>
                                    <td className="px-6 py-6 font-bold uppercase text-xs text-slate-200">
                                        {order.product_name}
                                    </td>
                                    <td className="px-6 py-6 text-center font-bold text-slate-400">
                                        {order.total_quantity} Pcs
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span
                                            className={`text-[9px] px-3 py-1 rounded-full font-black uppercase border ${order.payment_status === "paid" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-amber-500 border-amber-500/20 bg-amber-500/5"}`}
                                        >
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div
                                            className="flex justify-end gap-3"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() =>
                                                    openDetails(order)
                                                }
                                                className="p-2.5 bg-white/5 rounded-xl hover:bg-indigo-500 transition-all text-slate-400 hover:text-white"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Fix Logic: পেমেন্ট টেবিল থেকে transaction_id থাকলে সরাসরি Approve বাটন আসবে */}
                                            {order.payment_status === "paid" ||
                                            order.payment?.transaction_id ? (
                                                <button
                                                    onClick={() =>
                                                        handleApprove(order.id)
                                                    }
                                                    className="px-4 py-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                                >
                                                    <Check size={14} /> Approve
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        openQuoteModal(order)
                                                    }
                                                    className="px-4 py-2 bg-amber-600/10 border border-amber-500/20 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                                >
                                                    <DollarSign size={14} />{" "}
                                                    {order.total_amount > 0
                                                        ? "Wait Payment"
                                                        : "Send Quote"}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- DETAILS MODAL --- */}
                <AnimatePresence>
                    {isDetailModalOpen && selectedOrder && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsDetailModalOpen(false)}
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
                                        onClick={() =>
                                            setIsDetailModalOpen(false)
                                        }
                                        className="p-3 bg-white/5 rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                            <h4 className="text-[10px] font-black uppercase text-amber-500 mb-4 flex items-center gap-2">
                                                <Ruler size={14} /> Size
                                                Measurements
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
                                                    {
                                                        selectedOrder.priority_level
                                                    }
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
                                                    {
                                                        selectedOrder.target_delivery
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                            <p className="text-slate-500 text-[9px] font-black uppercase mb-1 tracking-[0.2em]">
                                                Manual Payment Verification
                                            </p>

                                            {/* পেমেন্ট রিলেশন থেকে transaction_id চেক করা হচ্ছে */}
                                            {selectedOrder.payment
                                                ?.transaction_id ? (
                                                <div className="mt-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                                    <p className="text-[10px] text-emerald-500 font-bold uppercase">
                                                        Transaction ID:
                                                    </p>
                                                    <p className="text-white font-black text-sm select-all">
                                                        {
                                                            selectedOrder
                                                                .payment
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
                                                    No manual payment submitted
                                                    yet.
                                                </p>
                                            )}

                                            <div className="flex justify-between items-center mt-6">
                                                <h3
                                                    className={`text-xl font-black uppercase ${selectedOrder.payment_status === "paid" ? "text-emerald-500" : "text-amber-500"}`}
                                                >
                                                    {
                                                        selectedOrder.payment_status
                                                    }
                                                </h3>
                                                <div className="text-right">
                                                    <p className="text-white font-black text-sm">
                                                        $
                                                        {
                                                            selectedOrder.total_amount
                                                        }
                                                    </p>
                                                    <p className="text-[9px] text-slate-600 font-bold uppercase">
                                                        Payable Amount
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Approve বাটন যদি ট্রানজেকশন আইডি থাকে */}
                                        {(selectedOrder.payment
                                            ?.transaction_id ||
                                            selectedOrder.payment_status ===
                                                "paid") && (
                                            <button
                                                onClick={() =>
                                                    handleApprove(
                                                        selectedOrder.id,
                                                    )
                                                }
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
                                            >
                                                <Check size={16} /> Confirm
                                                Payment & Start Production
                                            </button>
                                        )}
                                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                            <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-2 flex items-center gap-2">
                                                <Info size={14} /> Production
                                                Note
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

                {/* --- QUOTE MODAL --- */}
                <AnimatePresence>
                    {isQuoteModalOpen && selectedOrder && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsQuoteModalOpen(false)}
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
                                <form
                                    onSubmit={handleSendQuote}
                                    className="space-y-6"
                                >
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
                                            onClick={() =>
                                                setIsQuoteModalOpen(false)
                                            }
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
            </div>
        </ProductionLayout>
    );
}

export default OrderRequest;
