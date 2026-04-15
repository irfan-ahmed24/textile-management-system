import React from "react";
import { Activity } from "lucide-react";

function SystemActivityLog({ items }) {
    return (
        <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-[2rem] p-6 lg:p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="text-indigo-500" size={20} /> System
                    Activity
                </h2>
                <button className="text-indigo-400 text-xs font-bold hover:underline">
                    View All Logs
                </button>
            </div>

            <div className="space-y-5">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase border border-indigo-500/10">
                                {item.user[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-200">
                                    {item.user}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {item.action}
                                </p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">
                            {item.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SystemActivityLog;
