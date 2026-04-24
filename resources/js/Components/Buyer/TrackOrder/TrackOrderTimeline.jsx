import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

export default function TrackOrderTimeline({ foundOrder, baseStages }) {
    return (
        <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-12">
                {baseStages.map((stage, i) => {
                    const currentProgressId =
                        foundOrder.status === "pending"
                            ? 0
                            : foundOrder.current_stage_id;

                    const isCompleted = stage.id < currentProgressId;
                    const isCurrent = stage.id === currentProgressId;

                    return (
                        <div
                            key={stage.id}
                            className="flex gap-8 relative group"
                        >
                            {i !== baseStages.length - 1 && (
                                <div
                                    className={`absolute left-[19px] top-10 bottom-[-30px] w-0.5 ${isCompleted ? "bg-indigo-500" : "bg-white/5"}`}
                                ></div>
                            )}

                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 z-10 transition-all duration-500 ${
                                    isCurrent
                                        ? "bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                        : isCompleted
                                          ? "bg-emerald-500 border-emerald-400"
                                          : "bg-[#161b22] border-white/5"
                                }`}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 size={20} />
                                ) : isCurrent ? (
                                    <Clock
                                        size={20}
                                        className="animate-spin-slow"
                                    />
                                ) : (
                                    <span className="text-slate-700 text-xs font-black">
                                        {stage.id === 0 ? "P" : stage.id}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 pb-4">
                                <h4
                                    className={`text-lg font-black uppercase tracking-tight ${isCurrent ? "text-white" : isCompleted ? "text-slate-300" : "text-slate-700"}`}
                                >
                                    {stage.name}
                                </h4>
                                <p
                                    className={`text-[10px] font-bold uppercase mt-1 ${isCurrent ? "text-indigo-400" : isCompleted ? "text-emerald-500/70" : "text-slate-800"}`}
                                >
                                    {isCompleted
                                        ? "Finished Successfully"
                                        : isCurrent
                                          ? foundOrder.status === "pending"
                                              ? "Waiting for admin to review"
                                              : "Currently in this stage"
                                          : "Waiting to Start"}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
