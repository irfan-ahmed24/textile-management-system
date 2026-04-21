import React from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Settings as SettingsIcon,
    User,
    Bell,
    ShieldCheck,
    Factory,
    Database,
    Save,
    ChevronRight,
} from "lucide-react";

function Settings() {
    return (
        <InventoryLayout>
            <Head title="System Settings | TextileMS" />

            <div className="p-6 max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <SettingsIcon className="text-blue-500" size={28} />
                        System Settings
                    </h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                        Configure your profile, inventory alerts and system
                        preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Navigation Tabs */}
                    <div className="space-y-2">
                        <SettingTab
                            icon={<User size={18} />}
                            label="Profile Information"
                            active
                        />
                        <SettingTab
                            icon={<Factory size={18} />}
                            label="Factory Defaults"
                        />
                        <SettingTab
                            icon={<Bell size={18} />}
                            label="Alert Notifications"
                        />
                        <SettingTab
                            icon={<ShieldCheck size={18} />}
                            label="Security & Password"
                        />
                        <SettingTab
                            icon={<Database size={18} />}
                            label="Backup & Export"
                        />
                    </div>

                    {/* Right: Settings Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl"
                        >
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <User className="text-blue-500" size={20} />{" "}
                                Personal Profile
                            </h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Irfan Ahmed"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Inventory Manager"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="irfan@textile.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <hr className="border-white/5 my-8" />

                                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                    <Factory
                                        className="text-blue-500"
                                        size={20}
                                    />{" "}
                                    Inventory Preferences
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                            Default Low Stock Alert
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue="20"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                            Currency Symbol
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="$ (USD)"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                                        <Save size={20} /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

// সাব-কম্পোনেন্ট: সাইড ট্যাব বাটন
function SettingTab({ icon, label, active = false }) {
    return (
        <button
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"}`}
        >
            <div className="flex items-center gap-3 font-bold text-sm">
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
