import React from "react";
import {
    ArrowUpRight,
    CheckCircle2,
    ShoppingBag,
    Timer,
    Truck,
} from "lucide-react";

const stats = [
    {
        label: "Active Orders",
        value: "05",
        icon: ShoppingBag,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "In Production",
        value: "03",
        icon: Timer,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        label: "Shipped",
        value: "12",
        icon: Truck,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
    {
        label: "Completed",
        value: "48",
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
];

function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-[#080B11] border border-white/5 p-6 rounded-2xl hover:border-blue-500/30 transition-all group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div
                            className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}
                        >
                            <stat.icon size={24} />
                        </div>
                        <span className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                            <ArrowUpRight size={12} className="mr-1" /> 12%
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium">
                        {stat.label}
                    </h3>
                    <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default StatsGrid;
