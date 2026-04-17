import React from "react";

export default function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-[#080B11] border border-white/5 p-6 rounded-3xl hover:border-emerald-500/30 transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div
                            className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}
                        >
                            <stat.icon size={24} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">
                            Live
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium">
                        {stat.label}
                    </h3>
                    <p className="text-3xl font-bold text-white mt-1">
                        {stat.value}
                    </p>
                    <p
                        className={`text-[11px] mt-2 font-semibold ${
                            stat.color === "text-red-500"
                                ? "text-red-400"
                                : "text-slate-500"
                        }`}
                    >
                        {stat.trend}
                    </p>
                </div>
            ))}
        </div>
    );
}
