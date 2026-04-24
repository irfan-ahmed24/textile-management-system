import React from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    ShieldCheck,
    Save,
    Building2,
} from "lucide-react";

function Profile() {
    // লগইন করা ইউজারের ডাটা লারাভেল থেকে অটোমেটিক আসবে
    const { auth } = usePage().props;

    const { data, setData, patch, processing, recentlySuccessful, errors } =
        useForm({
            name: auth.user.name || "",
            email: auth.user.email || "",
            phone: auth.user.phone || "",
            company: auth.user.company || "",
            address: auth.user.address || "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // প্রোফাইল আপডেট করার জন্য লারাভেল রুট
        patch(route("profile.update"));
    };

    return (
        <BuyerLayout>
            <Head title="My Profile" />

            <div className="p-6 max-w-[900px] mx-auto text-white">
                <div className="mb-10">
                    <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                        <User className="text-indigo-500" /> Account Settings
                    </h1>
                    <p className="text-slate-500 text-[10px] font-bold uppercase mt-1">
                        Manage your personal information and security
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Avatar Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-8 text-center shadow-xl">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-4xl font-black border-4 border-[#0F1219] shadow-2xl">
                                    {data.name.charAt(0).toUpperCase()}
                                </div>
                                <button className="absolute bottom-0 right-0 p-3 bg-indigo-600 rounded-2xl border-4 border-[#0F1219] text-white hover:bg-indigo-700 transition-all shadow-lg group-hover:scale-110">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <h3 className="mt-6 text-lg font-black uppercase tracking-tight">
                                {data.name}
                            </h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                                Verified Buyer
                            </p>

                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                                    <ShieldCheck
                                        size={16}
                                        className="text-emerald-500"
                                    />{" "}
                                    2FA Enabled
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                                    <Building2
                                        size={16}
                                        className="text-indigo-500"
                                    />{" "}
                                    {data.company || "No Company Set"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form Section */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl space-y-6"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={16}
                                        />
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={16}
                                        />
                                        <input
                                            type="email"
                                            disabled
                                            value={data.email}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-slate-500 font-bold text-sm cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={16}
                                        />
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            placeholder="+880 1xxx..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Company */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                        Company Name
                                    </label>
                                    <div className="relative">
                                        <Building2
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={16}
                                        />
                                        <input
                                            type="text"
                                            value={data.company}
                                            onChange={(e) =>
                                                setData(
                                                    "company",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Textile Ltd."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
                                    Shipping Address
                                </label>
                                <div className="relative">
                                    <MapPin
                                        className="absolute left-4 top-4 text-slate-600"
                                        size={16}
                                    />
                                    <textarea
                                        rows="3"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        placeholder="Full delivery address..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-sm resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <p className="text-[10px] font-bold text-slate-600 uppercase">
                                    Last updated: Just now
                                </p>
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                                >
                                    <Save size={16} />{" "}
                                    {processing ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                            {recentlySuccessful && (
                                <p className="text-emerald-500 text-center font-bold text-[10px] uppercase animate-pulse">
                                    Profile updated successfully!
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Profile;
