import React from "react";

const recentOrders = [
    {
        id: "#TX-9021",
        name: "Cotton Twill",
        status: "Dyeing",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        p: "65%",
    },
    {
        id: "#TX-8842",
        name: "Denim Fabric",
        status: "Knitting",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        p: "30%",
    },
    {
        id: "#TX-7710",
        name: "Silk Blend",
        status: "Finishing",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        p: "90%",
    },
];

function RecentOrders() {
    return (
        <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Recent Orders
                </h2>
                <button className="text-sm text-blue-500 hover:underline font-semibold">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-white/5">
                            <th className="pb-4 font-bold">Order ID</th>
                            <th className="pb-4 font-bold">Product</th>
                            <th className="pb-4 font-bold">Status</th>
                            <th className="pb-4 font-bold text-right">
                                Progress
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {recentOrders.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="py-5 font-bold text-slate-300">
                                    {row.id}
                                </td>
                                <td className="py-5 text-slate-400">
                                    {row.name}
                                </td>
                                <td className="py-5">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${row.bg} ${row.color}`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="py-5 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-blue-500`}
                                                style={{ width: row.p }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-500">
                                            {row.p}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentOrders;
