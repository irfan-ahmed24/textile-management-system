import React from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Settings as SettingsIcon,
    User,
    Lock,
    Bell,
    Camera,
    Save,
    ShieldCheck,
} from "lucide-react";

function Settings() {
    return (
        <ProductionLayout>
            <Head title="Account Settings | Production" />

            <div className="p-6 max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <SettingsIcon className="text-indigo-500" size={28} />
                        Personal Settings
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
                        Manage your profile and account preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Profile Card */}
                    <div className="space-y-6">
                        <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-8 text-center shadow-2xl relative overflow-hidden group">
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="w-full h-full rounded-full bg-indigo-500/20 flex items-center justify-center border-2 border-indigo-500/30 overflow-hidden shadow-xl shadow-black/50">
                                    <User
                                        size={100}
                                        className="text-indigo-500"
                                    />
                                </div>
                            </div>
                            <h3 className="text-white font-black text-lg uppercase tracking-tight">
                                Irfan Ahmed
                            </h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                Floor Manager
                            </p>

                            <div className="mt-8 pt-8 border-t border-white/5 space-y-3 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-600 uppercase">
                                        Status
                                    </span>
                                    <span className="text-emerald-500 text-[9px] font-black uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                                        Active Now
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-600 uppercase">
                                        Shift
                                    </span>
                                    <span className="text-indigo-400 text-[9px] font-black uppercase bg-indigo-500/10 px-2 py-0.5 rounded">
                                        Morning
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Security Alert Small Box */}
                        <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-[2rem] p-6 flex items-center gap-4">
                            <ShieldCheck
                                className="text-indigo-500 shrink-0"
                                size={24}
                            />
                            <p className="text-slate-400 text-[11px] font-medium leading-tight">
                                Your account is secured with 2FA and encrypted
                                login sessions.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Details Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl"
                        >
                            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                                <User size={18} className="text-indigo-500" />{" "}
                                Account Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Irfan Ahmed"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="irfan@textile.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="+880 1712-345678"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Working Floor
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Sector-B (Dyeing)"
                                        disabled
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 px-6 text-slate-500 font-bold text-sm cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Password Change Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl"
                        >
                            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Lock size={18} className="text-indigo-500" />{" "}
                                Security Update
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Min. 8 chars"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Repeat password"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-end">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                                    <Save size={16} /> Save All Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </ProductionLayout>
    );
}

export default Settings;
