import React, { useState } from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
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
    CreditCard,
    Trash2,
    CheckCircle,
} from "lucide-react";

function MyOrder({ runningOrders = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    // --- ডাটা হ্যান্ডলিং (Inertia Form) ---
    const { data, setData, post, processing, reset, errors } = useForm({
        product_name: "",
        fabric_type: "Single Jersey (Cotton)",
        total_quantity: "",
        priority_level: "Standard Delivery",
        target_delivery: "",
        size_breakdown: { S: 0, M: 0, L: 0, XL: 0 },
        special_instructions: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("buyer.orders.store"), {
            onSuccess: () => {
                reset();
                setIsOrderModalOpen(false);
            },
        });
    };

    const handleCancelOrder = (id) => {
        if (confirm("Are you sure you want to cancel this order?")) {
            router.delete(route("buyer.orders.destroy", id));
        }
    };

    const filteredOrders = runningOrders.filter(
        (order) =>
            order.id.toString().includes(searchTerm) ||
            order.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <BuyerLayout>
            <Head title="My Orders" />

            <div className="p-6 max-w-[1200px] mx-auto text-white">
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                            <ShoppingBag className="text-indigo-500" /> Order
                            History
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">
                            Manage production requests & secure payments
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
                                placeholder="Search by ID or Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#161b22] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all font-medium"
                            />
                        </div>
                        <button
                            onClick={() => setIsOrderModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                            <Plus size={16} /> New Request
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <th className="px-8 py-5">Order Details</th>
                                <th className="px-6 py-5 text-center">
                                    Payment Status
                                </th>
                                <th className="px-6 py-5 text-center">
                                    Production Status
                                </th>
                                <th className="px-6 py-5">Total Payable</th>
                                <th className="px-8 py-5 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-indigo-500 uppercase tracking-widest block mb-1">
                                                #ORD-{order.id}
                                            </span>
                                            <span className="text-sm font-black uppercase text-white block">
                                                {order.product_name}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-500 uppercase">
                                                Qty: {order.total_quantity} Pcs
                                            </span>
                                        </td>

                                        <td className="px-6 py-6 text-center">
                                            <span
                                                className={`text-[9px] px-3 py-1.5 rounded-full font-black uppercase border ${
                                                    order.payment_status ===
                                                    "paid"
                                                        ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                                                        : "text-amber-500 border-amber-500/20 bg-amber-500/5"
                                                }`}
                                            >
                                                {order.payment_status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-6 text-center">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                {order.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-6">
                                            {order.total_amount > 0 ? (
                                                <div>
                                                    <span className="text-sm font-black text-white block">
                                                        ${order.total_amount}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                                                        Authorized Quote
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-[9px] font-bold text-slate-600 uppercase italic tracking-widest">
                                                    Awaiting Quote
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end items-center gap-3">
                                                {/* পেমেন্ট না হওয়া পর্যন্ত ক্যানসেল বাটন থাকবে */}
                                                {order.payment_status !==
                                                    "paid" && (
                                                    <button
                                                        onClick={() =>
                                                            handleCancelOrder(
                                                                order.id,
                                                            )
                                                        }
                                                        className="text-slate-600 hover:text-red-500 transition-all p-2 bg-white/5 rounded-lg border border-white/5"
                                                        title="Cancel Order"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}

                                                {/* পেমেন্ট স্ট্যাটাস অনুযায়ী বাটন লজিক */}
                                                {order.payment_status ===
                                                "paid" ? (
                                                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase">
                                                        <CheckCircle
                                                            size={14}
                                                        />{" "}
                                                        Paid & Locked
                                                    </div>
                                                ) : order.total_amount > 0 ? (
                                                    <Link
                                                        href={route(
                                                            "buyer.payment",
                                                            {
                                                                order_id:
                                                                    order.id,
                                                            },
                                                        )}
                                                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-black uppercase px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                                                    >
                                                        <CreditCard size={14} />{" "}
                                                        Pay Now
                                                    </Link>
                                                ) : (
                                                    <span className="text-[9px] font-black text-slate-700 uppercase italic">
                                                        Awaiting Price
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-20 text-slate-600 font-bold uppercase text-[10px] tracking-[0.2em]"
                                    >
                                        No active orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- NEW ORDER REQUEST MODAL --- */}
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

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
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
                                                <AlertTriangle size={12} />{" "}
                                                Priority
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
                                                <Calendar size={12} /> Target
                                                Delivery
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
                                                <Ruler size={12} /> Sizes
                                                (S,M,L,XL)
                                            </label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {["S", "M", "L", "XL"].map(
                                                    (size) => (
                                                        <input
                                                            key={size}
                                                            type="number"
                                                            placeholder={size}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "size_breakdown",
                                                                    {
                                                                        ...data.size_breakdown,
                                                                        [size]: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                                )
                                                            }
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 text-center text-white focus:outline-none focus:border-indigo-500 text-[10px] font-bold"
                                                        />
                                                    ),
                                                )}
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
                                        <Send size={16} />{" "}
                                        {processing
                                            ? "Submitting..."
                                            : "Submit Order Request"}
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
