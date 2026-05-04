import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // টোস্ট ইম্পোর্ট করা হয়েছে
import {
    Factory,
    ArrowLeft,
    User,
    Mail,
    Lock,
    Building2,
    Globe,
    Phone,
    MapPin,
    Send,
} from "lucide-react";

function Registration() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        company_name: "",
        website: "",
        address: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register.perform"), {
            onSuccess: () => {
                reset(); // ফর্ম ক্লিয়ার করবে
                toast.success(
                    "Application Sent! Admin will review your request.",
                    {
                        style: {
                            background: "#0F1219",
                            color: "#fff",
                            borderRadius: "20px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            fontSize: "14px",
                            fontWeight: "bold",
                        },
                        iconTheme: {
                            primary: "#3B82F6",
                            secondary: "#fff",
                        },
                    },
                );
            },
            onError: () => {
                toast.error("Please fix the errors in the form.");
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#080B11] flex items-center justify-center p-6 py-20 relative overflow-hidden">
            <Head title="Become a Buyer | TextileMS" />

            {/* নোটিফিকেশন পপআপের জন্য */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full lg:max-w-[700px] relative z-10">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0F1219]/80 backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-2xl mb-6 shadow-xl shadow-blue-600/20">
                            <Factory size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            Become a Buyer
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold">
                            Registration Portal
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <User
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? "text-red-500" : "text-slate-600"} group-focus-within:text-blue-500 transition-colors`}
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className={`w-full bg-white/5 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all`}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-[10px] uppercase font-bold ml-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? "text-red-500" : "text-slate-600"} group-focus-within:text-blue-500 transition-colors`}
                                        size={18}
                                    />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className={`w-full bg-white/5 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all`}
                                        placeholder="john@company.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-[10px] uppercase font-bold ml-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Company Name
                                </label>
                                <div className="relative group">
                                    <Building2
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.company_name ? "text-red-500" : "text-slate-600"} group-focus-within:text-blue-500 transition-colors`}
                                        size={18}
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
                                        className={`w-full bg-white/5 border ${errors.company_name ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all`}
                                        placeholder="Textile Co. Ltd"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Phone Number
                                </label>
                                <div className="relative group">
                                    <Phone
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.phone ? "text-red-500" : "text-slate-600"} group-focus-within:text-blue-500 transition-colors`}
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className={`w-full bg-white/5 border ${errors.phone ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all`}
                                        placeholder="+880..."
                                        required
                                    />
                                </div>
                            </div>

                            {/* Website */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Company Website
                                </label>
                                <div className="relative group">
                                    <Globe
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
                                        size={18}
                                    />
                                    <input
                                        type="url"
                                        value={data.website}
                                        onChange={(e) =>
                                            setData("website", e.target.value)
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Business Address
                                </label>
                                <div className="relative group">
                                    <MapPin
                                        className="absolute left-4 top-4 text-slate-600 group-focus-within:text-blue-500 transition-colors"
                                        size={18}
                                    />
                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all min-h-[100px]"
                                        placeholder="Street, City, Country"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? "text-red-500" : "text-slate-600"} group-focus-within:text-blue-500 transition-colors`}
                                        size={18}
                                    />
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`w-full bg-white/5 border ${errors.password ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all`}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-[10px] uppercase font-bold ml-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"
                                        size={18}
                                    />
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {processing ? "Processing..." : "Apply for Account"}{" "}
                            <Send size={20} />
                        </button>
                    </form>

                    <div className="mt-10 text-center border-t border-white/5 pt-8">
                        <p className="text-slate-500 text-sm">
                            Already a partner?{" "}
                            <Link
                                href="/login"
                                className="text-white font-bold hover:text-blue-500 transition-colors"
                            >
                                Login Here
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Registration;
