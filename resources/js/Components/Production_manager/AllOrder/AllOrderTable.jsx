import React from "react";
import {
    Layers,
    Calendar,
    User,
    Clock,
    AlertCircle,
    TrendingUp,
} from "lucide-react";

export default function AllOrderTable({ filteredOrders = [], getStatusStyle }) {
    return (
        <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02] border-b border-white/5">
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                Order Info
                            </th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                Client
                            </th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">
                                Progress
                            </th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">
                                Finance
                            </th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                Dates
                            </th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">
                                Status Code
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-white/[0.01] transition-colors group"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-all">
                                                <TrendingUp
                                                    size={18}
                                                    className="text-indigo-400"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-black text-indigo-500 uppercase tracking-tighter mb-0.5">
                                                    #ORD ID: {order.order_no}
                                                </p>
                                                <h4 className="font-bold text-slate-100 uppercase text-sm leading-none">
                                                    {order.product_name}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 mt-1 font-bold">
                                                    {order.fabric_type}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <User
                                                size={14}
                                                className="text-slate-500"
                                            />
                                            <span className="text-slate-300 font-bold text-xs uppercase">
                                                {order.buyer_name}
                                            </span>
                                        </div>
                                        <p className="text-[9px] text-slate-600 font-medium ml-5">
                                            {order.buyer_email}
                                        </p>
                                    </td>

                                    <td className="p-6 text-center">
                                        <div
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.order_status)}`}
                                        >
                                            <Layers size={12} />
                                            {order.current_stage}
                                        </div>
                                        <p className="text-[9px] text-slate-600 mt-1.5 font-bold uppercase">
                                            {order.order_status}
                                        </p>
                                    </td>

                                    <td className="p-6 text-center">
                                        <p className="text-white font-black text-sm">
                                            ${order.total_amount}
                                        </p>
                                        <div className="flex items-center justify-center gap-1 mt-1">
                                            <div
                                                className={`w-1.5 h-1.5 rounded-full ${order.payment_status === "paid" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}
                                            ></div>
                                            <span
                                                className={`text-[9px] font-black uppercase ${order.payment_status === "paid" ? "text-emerald-500" : "text-amber-500"}`}
                                            >
                                                {order.payment_status}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                            <Calendar size={12} />
                                            {order.target_delivery}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold mt-1">
                                            <Clock size={10} />
                                            {order.last_update}
                                        </div>
                                    </td>

                                    <td className="p-6 text-right">
                                        <span className="text-[10px] font-black text-slate-700 uppercase bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                            SEC-0{order.id}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-20 text-center">
                                    <div className="flex flex-col items-center gap-4 text-slate-600">
                                        <AlertCircle
                                            size={48}
                                            className="opacity-20"
                                        />
                                        <p className="font-black uppercase tracking-[0.3em] text-sm">
                                            Order ID Not Found
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
