import React from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // টোস্ট ইমপোর্ট করা হয়েছে
import {
    PackageSearch,
    Plus,
    Send,
    History,
    ChevronRight,
    AlertCircle,
    Database,
    Hash,
} from "lucide-react";

function MaterialRequest({ inventoryItems = [], requestHistory = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        inventory_id: "",
        quantity: "",
        reason: "",
    });

    const submitRequest = (e) => {
        e.preventDefault();

        // ফর্ম সাবমিট করার সময় টোস্ট লজিক
        post(route("production.material-request.store"), {
            onStart: () => {
                // চাইলে এখানে 'Sending...' টোস্ট দিতে পারেন
            },
            onSuccess: () => {
                reset();
                toast.success("Request sent successfully!", {
                    style: {
                        borderRadius: "15px",
                        background: "#10B981",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        textTransform: "uppercase",
                    },
                });
            },
            onError: (err) => {
                toast.error("Failed to send request. Check inputs.", {
                    style: {
                        borderRadius: "15px",
                        background: "#EF4444",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        textTransform: "uppercase",
                    },
                });
            },
        });
    };

    return (
        <ProductionLayout>
            <Head title="Material Request | Production" />

            {/* টোস্ট কন্টেইনার যোগ করা হয়েছে */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="p-6 max-w-[1200px] mx-auto">
                <div className="mb-10">
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <PackageSearch className="text-blue-500" size={28} />
                        Material Requisition
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
                        Dispatch requests to inventory manager for raw materials
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                            <h3 className="text-white font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-2">
                                <Plus size={16} className="text-blue-500" />{" "}
                                Create New Requisition
                            </h3>

                            <form
                                onSubmit={submitRequest}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                                            <Database size={10} /> Select
                                            Material
                                        </label>
                                        <select
                                            value={data.inventory_id}
                                            onChange={(e) =>
                                                setData(
                                                    "inventory_id",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full bg-white/5 border ${errors.inventory_id ? "border-red-500/50" : "border-white/10"} rounded-xl py-4 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-bold appearance-none cursor-pointer`}
                                        >
                                            <option
                                                value=""
                                                className="bg-[#0F1219]"
                                            >
                                                Choose Material...
                                            </option>
                                            {inventoryItems.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                    className="bg-[#0F1219]"
                                                >
                                                    {item.item_name} (
                                                    {item.item_code})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                            Needed Quantity
                                        </label>
                                        <input
                                            type="number"
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter amount"
                                            className={`w-full bg-white/5 border ${errors.quantity ? "border-red-500/50" : "border-white/10"} rounded-xl py-4 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-bold`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Reason / Order Reference
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={data.reason}
                                        onChange={(e) =>
                                            setData("reason", e.target.value)
                                        }
                                        placeholder="Explain why these materials are needed..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-medium resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 uppercase text-[11px] tracking-[0.2em] active:scale-95 disabled:opacity-50"
                                >
                                    <Send size={18} />{" "}
                                    {processing
                                        ? "Processing..."
                                        : "Push Request to Inventory"}
                                </button>
                            </form>
                        </div>

                        {/* Recent Requests Table */}
                        <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] overflow-hidden shadow-xl">
                            <div className="p-8 border-b border-white/5">
                                <h3 className="text-white font-black text-sm uppercase tracking-tight flex items-center gap-2">
                                    <History
                                        size={16}
                                        className="text-slate-400"
                                    />{" "}
                                    Recent Track Log
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-slate-500 text-[9px] uppercase font-black tracking-widest border-b border-white/5">
                                        <tr>
                                            <th className="px-8 py-4">ID</th>
                                            <th className="px-8 py-4">
                                                Material
                                            </th>
                                            <th className="px-8 py-4 text-center">
                                                Qty
                                            </th>
                                            <th className="px-8 py-4 text-center">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {requestHistory.length > 0 ? (
                                            requestHistory.map((req) => (
                                                <tr
                                                    key={req.id}
                                                    className="hover:bg-white/[0.02] transition-all"
                                                >
                                                    <td className="px-8 py-5 text-blue-500 font-mono text-xs font-black">
                                                        #{req.id}
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex flex-col">
                                                            <span className="text-slate-200 font-bold text-xs uppercase">
                                                                {req.item_name}
                                                            </span>
                                                            <span className="text-[9px] text-slate-600 font-black uppercase">
                                                                {req.item_code}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-center text-white font-black text-xs">
                                                        {req.qty}{" "}
                                                        <small className="text-slate-600">
                                                            {req.unit}
                                                        </small>
                                                    </td>
                                                    <td className="px-8 py-5 text-center">
                                                        <span
                                                            className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest border ${req.status === "Approved" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}
                                                        >
                                                            {req.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="p-8 text-center text-slate-600 text-[10px] font-bold uppercase"
                                                >
                                                    No request history found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Live Inventory */}
                    <div className="space-y-6">
                        <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-6 shadow-xl sticky top-6">
                            <h3 className="text-white font-black text-sm uppercase tracking-tight mb-6 flex items-center gap-2">
                                <Database
                                    size={16}
                                    className="text-emerald-500"
                                />{" "}
                                Live Inventory
                            </h3>
                            <div className="space-y-4">
                                {inventoryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all group"
                                    >
                                        <div className="flex items-center gap-1 text-emerald-500 mb-1">
                                            <Hash size={10} />
                                            <span className="text-[9px] font-black uppercase">
                                                {item.item_code}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <h4 className="text-slate-300 text-[11px] font-bold uppercase truncate max-w-[120px]">
                                                {item.item_name}
                                            </h4>
                                            <div className="text-white font-black text-sm">
                                                {item.quantity}{" "}
                                                <small className="text-slate-500 text-[9px]">
                                                    {item.unit}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProductionLayout>
    );
}

export default MaterialRequest;
