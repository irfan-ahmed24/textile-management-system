import React from "react";
import { Activity } from "lucide-react";

export default function MovementLogs({ logs }) {
    return (
        <div className="lg:col-span-2 bg-[#080B11] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Activity className="text-emerald-500" size={20} />{" "}
                        Movement Logs
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">
                        সবশেষ ইনভেন্টরি ট্রানজ্যাকশনগুলো এখানে দেখুন।
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-white/5">
                            <th className="pb-4">Material</th>
                            <th className="pb-4">Type</th>
                            <th className="pb-4">Qty</th>
                            <th className="pb-4 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {logs.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="py-5 font-bold text-slate-300">
                                    {row.name}
                                </td>
                                <td className="py-5">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tighter ${row.bg} ${row.color}`}
                                    >
                                        {row.type}
                                    </span>
                                </td>
                                <td
                                    className={`py-5 font-mono font-bold ${row.color}`}
                                >
                                    {row.qty}
                                </td>
                                <td className="py-5 text-right text-slate-500 text-xs font-semibold">
                                    {row.time}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
