import React from "react";
// এখানে AlertCircle এবং AlertTriangle দুটিই ইমপোর্ট করা হয়েছে
import {
    Package,
    DollarSign,
    AlertTriangle,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Activity,
} from "lucide-react";

export default function StatsGrid({ stats = [] }) {
    // লেবেলের ওপর ভিত্তি করে আইকন সেট করার লজিক
    const getIcon = (label) => {
        switch (label) {
            case "Total Items":
                return Package;
            case "Total Stock Value":
                return DollarSign;
            case "Low Stock Alert":
                return AlertTriangle;
            case "Out of Stock":
                return AlertCircle; // এখন আর এরর দিবে না
            default:
                return Activity;
        }
    };

    const getColorClasses = (label) => {
        if (label === "Low Stock Alert" || label === "Out of Stock") {
            return "bg-red-500/10 text-red-500";
        }
        return "bg-emerald-500/10 text-emerald-500";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => {
                const Icon = getIcon(stat.label);
                const colorClasses = getColorClasses(stat.label);

                return (
                    <div
                        key={i}
                        className="bg-[#080B11] border border-white/5 p-6 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-300 group shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl ${colorClasses}`}>
                                <Icon size={24} />
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                Live
                            </span>
                        </div>

                        <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            {stat.label}
                        </h3>

                        <p className="text-3xl font-black text-white mt-2 tracking-tight">
                            {stat.value}
                        </p>

                        <div className="flex items-center gap-2 mt-4">
                            <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${stat.isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-400"}`}
                            >
                                {stat.change}
                            </span>
                            <span className="text-[10px] text-slate-600 font-bold uppercase">
                                vs last month
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
