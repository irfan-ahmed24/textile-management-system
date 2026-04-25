import React from "react";
import { motion } from "framer-motion";
import {
    Play,
    RefreshCcw,
    Layers,
    Building2,
    CheckCircle2,
} from "lucide-react";

export default function RunningOrderCard({
    order,
    baseStages = [],
    onUpdateStatus,
}) {
    const progress = Math.round((order.current_stage_id / 6) * 100);
    const currentStageName =
        baseStages.find((s) => s.id == order.current_stage_id)?.name ||
        "Queued";

    return (
        <motion.div
            layout
            className="bg-[#0F1219] border border-white/5 rounded-[2rem] p-6 hover:border-emerald-500/20 transition-all group shadow-xl"
        >
            <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex items-center gap-4 w-full lg:w-[30%]">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shrink-0">
                        <Play
                            size={18}
                            className="text-emerald-500 fill-emerald-500"
                        />
                    </div>
                    <div className="truncate">
                        <h3 className="text-white font-black text-sm uppercase truncate">
                            {order.product_name}
                        </h3>
                        <div className="flex gap-2 mt-1">
                            <span className="text-slate-500 text-[9px] font-black uppercase bg-white/5 px-2 py-0.5 rounded">
                                #ORD-{order.id}
                            </span>
                            <span className="text-emerald-500/80 text-[9px] font-black uppercase flex items-center gap-1">
                                <Layers size={10} /> {currentStageName}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[20%] border-l border-white/5 pl-8">
                    <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1">
                        Ordered By
                    </p>
                    <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-indigo-500" />
                        <span className="text-slate-300 font-bold text-xs uppercase">
                            {order.user?.name}
                        </span>
                    </div>
                </div>

                <div className="flex-1 w-full border-l border-white/5 pl-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-slate-600 text-[10px] font-black uppercase tracking-tighter">
                            Manufacturing Progress
                        </span>
                        <span className="text-white text-[10px] font-black">
                            {progress}%
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>
                </div>

                {order.current_stage_id == 6 ? (
                    <button
                        disabled
                        className="px-6 py-3 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-xl border border-emerald-500/20 flex items-center gap-2 cursor-not-allowed"
                    >
                        <CheckCircle2 size={14} /> Completed
                    </button>
                ) : (
                    <button
                        onClick={() => onUpdateStatus(order)}
                        className="px-6 py-3 bg-white/5 hover:bg-emerald-600 text-slate-300 hover:text-white text-[10px] font-black uppercase rounded-xl border border-white/5 transition-all flex items-center gap-2 active:scale-95"
                    >
                        <RefreshCcw size={14} /> Update Status
                    </button>
                )}
            </div>
        </motion.div>
    );
}
