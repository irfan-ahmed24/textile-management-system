import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    Building2,
    CheckCircle,
} from "lucide-react";

export default function ProfileForm({
    data,
    setData,
    errors,
    handleSubmit,
    recentlySuccessful,
    processing,
}) {
    return (
        <div className="lg:col-span-2">
            <form
                onSubmit={handleSubmit}
                className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl space-y-8"
            >
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                            Full Name
                        </label>
                        <div className="relative group">
                            <User
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors"
                                size={18}
                            />
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-[10px] font-bold uppercase">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                            Email (Primary)
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700"
                                size={18}
                            />
                            <input
                                type="email"
                                disabled
                                value={data.email}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-slate-600 font-bold text-sm cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                            Phone Number
                        </label>
                        <div className="relative group">
                            <Phone
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors"
                                size={18}
                            />
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                placeholder="Enter your phone"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-[10px] font-bold uppercase">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                            Company Name
                        </label>
                        <div className="relative group">
                            <Building2
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors"
                                size={18}
                            />
                            <input
                                type="text"
                                value={data.company_name}
                                onChange={(e) =>
                                    setData("company_name", e.target.value)
                                }
                                placeholder="Organization name"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">
                        Full Shipping Address
                    </label>
                    <div className="relative group">
                        <MapPin
                            className="absolute left-4 top-4 text-slate-600 group-focus-within:text-indigo-500 transition-colors"
                            size={18}
                        />
                        <textarea
                            rows="3"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            placeholder="Street, City, Zip Code"
                            className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm resize-none shadow-inner"
                        ></textarea>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex-1">
                        <AnimatePresence>
                            {recentlySuccessful && (
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                                >
                                    <CheckCircle size={14} /> Profile
                                    Synchronized with Database!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <button
                        disabled={processing}
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 disabled:opacity-50"
                    >
                        <Save size={16} />
                        {processing ? "Saving Data..." : "Update Account"}
                    </button>
                </div>
            </form>
        </div>
    );
}
