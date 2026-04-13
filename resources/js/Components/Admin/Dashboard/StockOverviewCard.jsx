import React from "react";
import { BarChart3 } from "lucide-react";

function StockOverviewCard({ stocks }) {
    return (
        <div className="bg-[#080B11] border border-white/5 rounded-[2rem] p-8 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="text-indigo-500" size={20} /> Stock
                Overview
            </h2>
            <div className="space-y-6 flex-1">
                {stocks.map((stock, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs font-bold mb-2">
                            <span className="text-slate-400 uppercase tracking-tighter">
                                {stock.name}
                            </span>
                            <span
                                className={
                                    stock.level < 50
                                        ? "text-amber-500"
                                        : "text-slate-300"
                                }
                            >
                                {stock.level}%
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${stock.color} transition-all duration-1000`}
                                style={{ width: `${stock.level}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-indigo-600/20">
                    Generate Full Inventory Report
                </button>
            </div>
        </div>
    );
}

export default StockOverviewCard;
