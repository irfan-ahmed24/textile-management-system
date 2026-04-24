import React from "react";
import { Activity } from "lucide-react";

export default function TrackOrderSummaryCard({ foundOrder }) {
    return (
        <div className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-8 flex flex-wrap justify-between items-center gap-6 shadow-2xl">
            <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                    Product Name
                </p>
                <h3 className="text-white font-black text-xl uppercase tracking-tight">
                    {foundOrder.product_name}
                </h3>
            </div>
            <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                    Status
                </p>
                <span
                    className={`font-black text-sm uppercase flex items-center gap-2 ${foundOrder.status === "pending" ? "text-blue-400" : "text-amber-500"}`}
                >
                    <Activity
                        size={16}
                        className={
                            foundOrder.status !== "pending"
                                ? "animate-pulse"
                                : ""
                        }
                    />{" "}
                    {foundOrder.status}
                </span>
            </div>
            <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                    Deadline
                </p>
                <h3 className="text-slate-300 font-bold text-sm uppercase">
                    {new Date(foundOrder.target_delivery).toLocaleDateString()}
                </h3>
            </div>
        </div>
    );
}
