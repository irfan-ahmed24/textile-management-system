import React from "react";
import { Eye, Check, DollarSign } from "lucide-react";

export default function OrderRequestTable({
    filteredOrders = [],
    onViewDetails,
    onApprove,
    onOpenQuote,
}) {
    return (
        <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                        <th className="px-8 py-5">Order ID</th>
                        <th className="px-6 py-5">Product Name</th>
                        <th className="px-6 py-5 text-center">Quantity</th>
                        <th className="px-6 py-5 text-center">Payment</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredOrders.map((order) => (
                        <tr
                            key={order.id}
                            className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                            onClick={() => onViewDetails(order)}
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
                                        onClick={() => onViewDetails(order)}
                                        className="p-2.5 bg-white/5 rounded-xl hover:bg-indigo-500 transition-all text-slate-400 hover:text-white"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    {order.payment_status === "paid" ||
                                    order.payment?.transaction_id ? (
                                        <button
                                            onClick={() => onApprove(order.id)}
                                            className="px-4 py-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                        >
                                            <Check size={14} /> Approve
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onOpenQuote(order)}
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
    );
}
