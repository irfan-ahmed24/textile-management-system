import React from "react";
import { Building2, ShieldCheck, CheckCircle } from "lucide-react";

export default function ProfileSidebarCard({ userData }) {
    return (
        <div className="lg:col-span-1">
            <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-8 text-center shadow-xl sticky top-6">
                <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-4xl font-black border-4 border-white/5 shadow-2xl">
                        {userData?.name
                            ? userData.name.charAt(0).toUpperCase()
                            : "?"}
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-full border-4 border-[#0F1219] text-white">
                        <CheckCircle size={16} />
                    </div>
                </div>

                <h3 className="mt-6 text-lg font-black uppercase tracking-tight text-white">
                    {userData?.name}
                </h3>
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                    {userData?.email}
                </p>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-white/5 p-3 rounded-2xl border border-white/5">
                        <Building2 size={16} className="text-indigo-500" />
                        {userData?.company_name || "No Company Set"}
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-white/5 p-3 rounded-2xl border border-white/5">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        Database Sync Active
                    </div>
                </div>
            </div>
        </div>
    );
}
