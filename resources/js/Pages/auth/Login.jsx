import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Factory, ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { div } from "framer-motion/client";

function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="min-h-screen bg-[#080B11] flex items-center justify-center p-4 relative overflow-hidden">
            <Head title="Login | TextileMS" />

            {/* --- Background Glares --- */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            </div>

            {/* --- Main Container: ডেস্কটপে ৪০% বা তার কম রাখার জন্য --- */}
            <div className="w-full md:w-[450px] lg:max-w-[450px] xl:w-[500px] relative z-10">
                {/* Back to Home Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-all group text-sm font-medium"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0F1219]/80 backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-600/20">
                            <Factory size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-2">
                            Login
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                            Textile Management
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Email
                            </label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
                                    size={18}
                                />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-[10px] mt-1 ml-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Password
                                </label>
                                <Link
                                    href="#"
                                    className="text-[10px] text-blue-500 hover:text-blue-400 font-black"
                                >
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
                                    size={18}
                                />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            Sign In <LogIn size={20} />
                        </button>
                    </form>

                    <div className="mt-10 text-center border-t border-white/5 pt-8">
                        <p className="text-slate-500 text-sm">
                            New Buyer?{" "}
                            <Link
                                href="/register"
                                className="text-white font-bold hover:text-blue-500 transition-colors"
                            >
                                Apply Now
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Copyright info below card */}
                <p className="text-center text-slate-700 text-[10px] uppercase tracking-[0.3em] mt-8 font-bold">
                    &copy; 2026 TextileMS Global
                </p>
            </div>
        </div>
    );
}

export default Login;
