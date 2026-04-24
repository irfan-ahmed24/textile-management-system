import React from "react";
import {
    ArrowUpRight,
    CheckCircle2,
    ShoppingBag,
    Timer,
    Truck,
} from "lucide-react";

// stats প্রপস রিসিভ করা হচ্ছে
function StatsGrid({ stats }) {
    // ডাটাবেস থেকে আসা ডাটার ওপর ভিত্তি করে কনফিগারেশন অ্যারে
    const statCards = [
        {
            label: "Active Orders",
            value: stats?.total || "00", // কন্ট্রোলার থেকে পাঠানো কী (key) অনুযায়ী
            icon: ShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "In Production",
            value: stats?.running || "00",
            icon: Timer,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            label: "Shipped",
            value: stats?.shipped || "00", // যদি ডাটাবেসে shipped কাউন্ট থাকে
            icon: Truck,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
        },
        {
            label: "Completed",
            value: stats?.completed || "00",
            icon: CheckCircle2,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((stat, i) => (
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
                        {/* গ্রোথ পার্সেন্টেজ (আপাতত স্ট্যাটিক রাখা হয়েছে) */}
                        <span className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                            <ArrowUpRight size={12} className="mr-1" /> 12%
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium">
                        {stat.label}
                    </h3>
                    <p className="text-2xl font-bold text-white mt-1">
                        {/* ভ্যালু ফরম্যাটিং (যেমন: ৫ কে ০৫ দেখানো) */}
                        {stat.value < 10 && stat.value > 0
                            ? `0${stat.value}`
                            : stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default StatsGrid;
