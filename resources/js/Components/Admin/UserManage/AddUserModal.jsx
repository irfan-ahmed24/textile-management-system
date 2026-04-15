import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    UserPlus,
    X,
    User,
    Mail,
    Lock,
    Briefcase,
    ChevronDown,
    Phone,
    Building2,
    Globe,
    MapPin,
    Loader2,
    CheckCircle,
    Copy,
} from "lucide-react";

function AddUserModal({ isOpen, onClose }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [createdUser, setCreatedUser] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            email: "",
            phone: "",
            role: "",
            company_name: "",
            website: "",
            address: "",
            password: "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/user_management/store", {
            onSuccess: (page) => {
                setCreatedUser({ email: data.email, password: data.password }); // ডাটা সেভ করে রাখা
                setShowSuccess(true); // সাকসেস পপআপ দেখানো
                reset();
            },
            preserveScroll: true,
            preserveState: true, // এটি পেজ রিডাইরেক্ট হওয়া আটকাবে
        });
    };

    const handleCloseAll = () => {
        setShowSuccess(false);
        setCreatedUser(null);
        clearErrors();
        onClose();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && !showSuccess && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseAll}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-[#080B11] border border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden my-8"
                        >
                            <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <div className="p-2 bg-indigo-600 rounded-xl">
                                        <UserPlus
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                    Create New User
                                </h2>
                                <button
                                    onClick={handleCloseAll}
                                    className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form
                                className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <User
                                                className={`absolute left-4 top-3 size={16} transition-colors ${errors.name ? "text-red-500" : "text-slate-500 group-focus-within:text-indigo-500"}`}
                                            />
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="John Doe"
                                                className={`w-full bg-white/5 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="text-[10px] text-red-500 ml-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                            Phone Number
                                        </label>
                                        <div className="relative group">
                                            <Phone
                                                className="absolute left-4 top-3 text-slate-500 group-focus-within:text-indigo-500 transition-colors"
                                                size={16}
                                            />
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="+880 1XXX XXXXXX"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                            Email Address
                                        </label>
                                        <div className="relative group">
                                            <Mail
                                                className={`absolute left-4 top-3 size={16} transition-colors ${errors.email ? "text-red-500" : "text-slate-500 group-focus-within:text-indigo-500"}`}
                                            />
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="example@mail.com"
                                                className={`w-full bg-white/5 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-[10px] text-red-500 ml-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                            Role
                                        </label>
                                        <div className="relative group">
                                            <Briefcase
                                                className={`absolute left-4 top-3 size={16} transition-colors ${errors.role ? "text-red-500" : "text-slate-500 group-focus-within:text-indigo-500"}`}
                                            />
                                            <select
                                                value={data.role}
                                                onChange={(e) =>
                                                    setData(
                                                        "role",
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full bg-[#080B11] border ${errors.role ? "border-red-500/50" : "border-white/10"} rounded-2xl py-2.5 pl-11 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none transition-all`}
                                            >
                                                <option value="">
                                                    Select Role
                                                </option>
                                                <option value="Admin">
                                                    Admin
                                                </option>
                                                <option value="Inventory Manager">
                                                    Inventory Manager
                                                </option>
                                                <option value="Production Manager">
                                                    Production Manager
                                                </option>
                                                <option value="Buyer">
                                                    Buyer
                                                </option>
                                            </select>
                                            <ChevronDown
                                                className="absolute right-4 top-3 text-slate-500 pointer-events-none"
                                                size={16}
                                            />
                                        </div>
                                        {errors.role && (
                                            <p className="text-[10px] text-red-500 ml-1">
                                                {errors.role}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                                Company Name
                                            </label>
                                            <div className="relative group">
                                                <Building2
                                                    className="absolute left-4 top-3 text-slate-500 group-focus-within:text-indigo-500 transition-colors"
                                                    size={16}
                                                />
                                                <input
                                                    type="text"
                                                    value={data.company_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "company_name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Textile MS Ltd."
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                                Company Website
                                            </label>
                                            <div className="relative group">
                                                <Globe
                                                    className="absolute left-4 top-3 text-slate-500 group-focus-within:text-indigo-500 transition-colors"
                                                    size={16}
                                                />
                                                <input
                                                    type="url"
                                                    value={data.website}
                                                    onChange={(e) =>
                                                        setData(
                                                            "website",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="https://example.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                            Company Address
                                        </label>
                                        <div className="relative group">
                                            <MapPin
                                                className="absolute left-4 top-3 text-slate-500 group-focus-within:text-indigo-500 transition-colors"
                                                size={16}
                                            />
                                            <textarea
                                                rows="2"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Street, City, Country"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pb-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <Lock
                                            className={`absolute left-4 top-3 size={16} transition-colors ${errors.password ? "text-red-500" : "text-slate-500 group-focus-within:text-indigo-500"}`}
                                        />
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="••••••••"
                                            className={`w-full bg-white/5 border ${errors.password ? "border-red-500/50" : "border-white/10"} rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="text-[10px] text-red-500 ml-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2
                                                className="animate-spin"
                                                size={18}
                                            />{" "}
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create User Account"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- Success Modal --- */}
            <AnimatePresence>
                {showSuccess && createdUser && (
                    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-[#080B11] border border-emerald-500/20 w-full max-w-md rounded-[2.5rem] p-8 text-center shadow-2xl shadow-emerald-500/10"
                        >
                            <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle
                                    className="text-emerald-500"
                                    size={32}
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                User Created!
                            </h2>
                            <p className="text-slate-400 text-sm mb-8">
                                Account credentials are ready to share.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative group">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left mb-1">
                                        Email Address
                                    </p>
                                    <p className="text-white font-medium text-left">
                                        {createdUser.email}
                                    </p>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(createdUser.email)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative group">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left mb-1">
                                        Temporary Password
                                    </p>
                                    <p className="text-white font-mono text-left">
                                        {createdUser.password}
                                    </p>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(
                                                createdUser.password,
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleCloseAll}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-sm transition-all"
                            >
                                Done & Close
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

export default AddUserModal;
