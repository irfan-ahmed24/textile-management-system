import React from "react";
import { Link } from "@inertiajs/react";
import { CreditCard, Trash2, CheckCircle } from "lucide-react";

export default function OrdersTable({ filteredOrders, handleCancelOrder }) {
    return (
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
                        <th className="px-8 py-5 text-right">Actions</th>
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
                                            order.payment_status === "paid"
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
                                        {order.payment_status !== "paid" && (
                                            <button
                                                onClick={() =>
                                                    handleCancelOrder(order.id)
                                                }
                                                className="text-slate-600 hover:text-red-500 transition-all p-2 bg-white/5 rounded-lg border border-white/5"
                                                title="Cancel Order"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}

                                        {order.payment_status === "paid" ? (
                                            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase">
                                                <CheckCircle size={14} /> Paid &
                                                Locked
                                            </div>
                                        ) : order.total_amount > 0 ? (
                                            <Link
                                                href={route("buyer.payment", {
                                                    order_id: order.id,
                                                })}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-black uppercase px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                                            >
                                                <CreditCard size={14} /> Pay Now
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
    );
}
