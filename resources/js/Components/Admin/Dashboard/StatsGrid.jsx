import React from "react";

function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-[#080B11] border border-white/5 p-6 rounded-3xl hover:border-indigo-500/30 transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div
                            className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}
                        >
                            <stat.icon size={24} />
                        </div>
                        <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg ${stat.isUp ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"}`}
                        >
                            {stat.trend}
                        </span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-semibold">
                        {stat.label}
                    </h3>
                    <p className="text-3xl font-bold text-white mt-1">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default StatsGrid;
