import React from "react";
import { Link } from "@inertiajs/react";

function RecentOrders({ orders = [] }) {
    // স্ট্যাটাস অনুযায়ী কালার কনফিগারেশন
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return { color: "text-blue-500", bg: "bg-blue-500/10" };
            case "in-production":
                return { color: "text-amber-500", bg: "bg-amber-500/10" };
            case "shipped":
                return { color: "text-indigo-500", bg: "bg-indigo-500/10" };
            case "completed":
                return { color: "text-emerald-500", bg: "bg-emerald-500/10" };
            default:
                return { color: "text-slate-500", bg: "bg-slate-500/10" };
        }
    };

    return (
        <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Recent Orders
                </h2>
                <Link
                    href={route("buyer.orders")}
                    className="text-sm text-blue-500 hover:underline font-semibold"
                >
                    View All
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-white/5">
                            <th className="pb-4 font-bold">Order ID</th>
                            <th className="pb-4 font-bold">Product</th>
                            <th className="pb-4 font-bold">Status</th>
                            <th className="pb-4 font-bold text-right">
                                Placement Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {orders.length > 0 ? (
                            orders.map((order) => {
                                const styles = getStatusStyles(order.status);
                                return (
                                    <tr
                                        key={order.id}
                                        className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="py-5 font-bold text-slate-300">
                                            #ORD-{order.id}
                                        </td>
                                        <td className="py-5 text-slate-400 font-medium">
                                            {order.product_name}
                                        </td>
                                        <td className="py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${styles.bg} ${styles.color} border border-white/5`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-5 text-right text-slate-500 font-bold text-xs">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="py-10 text-center text-slate-600 font-bold uppercase text-[10px] tracking-widest"
                                >
                                    No Recent Orders Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentOrders;
