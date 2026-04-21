import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Settings as SettingsIcon,
    ShieldCheck,
    Users,
    Database,
    Bell,
    Globe,
    Save,
    Lock,
    ChevronRight,
} from "lucide-react";

function Settings() {
    return (
        <AdminLayout>
            <Head title="System Settings | Admin" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        <SettingsIcon className="text-indigo-500" size={32} />
                        System Control
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                        Configure global system parameters and administrative
                        permissions
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left: Navigation Tabs */}
                    <div className="space-y-3">
                        <SettingTab
                            icon={<ShieldCheck size={20} />}
                            label="Global Security"
                            active
                        />
                        <SettingTab
                            icon={<Users size={20} />}
                            label="Admin Management"
                        />
                        <SettingTab
                            icon={<Database size={20} />}
                            label="System Backup"
                        />
                        <SettingTab
                            icon={<Globe size={20} />}
                            label="API Configurations"
                        />
                        <SettingTab
                            icon={<Bell size={20} />}
                            label="Broadcast Alerts"
                        />
                    </div>

                    {/* Right: Settings Forms */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Security Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0F1219]/80 border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-white font-black text-xl uppercase tracking-tight flex items-center gap-3">
                                    <Lock
                                        className="text-indigo-500"
                                        size={22}
                                    />{" "}
                                    System Security Policy
                                </h3>
                                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[9px] font-black uppercase rounded-lg border border-indigo-500/20">
                                    Enhanced Security Active
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                        Two-Factor Authentication
                                    </label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer font-bold text-sm">
                                        <option className="bg-[#0F1219]">
                                            Required for all Admins
                                        </option>
                                        <option className="bg-[#0F1219]">
                                            Optional
                                        </option>
                                        <option className="bg-[#0F1219]">
                                            Disabled
                                        </option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                        Session Timeout (Minutes)
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue="60"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                                    />
                                </div>
                            </div>

                            <hr className="border-white/5 my-10" />

                            <h3 className="text-white font-black text-xl uppercase tracking-tight mb-8">
                                System Identifiers
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                        Application Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="TextileMS Pro"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                        Admin Support Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="admin@textilems.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                                    />
                                </div>
                            </div>

                            <div className="mt-12">
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
                                    <Save size={18} /> Update Global
                                    Configuration
                                </button>
                            </div>
                        </motion.div>

                        {/* Quick Insight Card */}
                        <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <Database
                                        className="text-indigo-500"
                                        size={28}
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-lg uppercase">
                                        Auto Backup System
                                    </h4>
                                    <p className="text-slate-500 text-xs font-medium">
                                        Last full system backup was successful
                                        on April 21, 2026 at 11:45 PM.
                                    </p>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                Backup Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// সাব-কম্পোনেন্ট: সাইড নেভিগেশন ট্যাব
function SettingTab({ icon, label, active = false }) {
    return (
        <button
            className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all group ${active ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 border-transparent" : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300 border border-white/5"}`}
        >
            <div className="flex items-center gap-4 font-black text-[11px] uppercase tracking-widest">
                {icon}
                {label}
            </div>
            <ChevronRight
                size={16}
                className={`${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
            />
        </button>
    );
}

export default Settings;
