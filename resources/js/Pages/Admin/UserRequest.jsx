import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react"; // router ইম্পোর্ট করা হয়েছে
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // নোটিফিকেশনের জন্য
import {
    UserPlus,
    Check,
    X,
    UserCircle,
    Mail,
    Phone,
    Building2,
    Calendar,
    ArrowUpRight,
} from "lucide-react";

function UserRequest({ buyerRequests }) {
    // props হিসেবে ডাটা গ্রহণ

    // অ্যাপ্রুভ হ্যান্ডলার
    const handleApprove = (id) => {
        if (confirm("Are you sure you want to approve this buyer?")) {
            router.patch(
                route("admin.user-requests.approve", id),
                {},
                {
                    onSuccess: () => toast.success("Buyer Activated!"),
                },
            );
            console.log(id);
        }
    };
    const handleReject = (id) => {
        if (confirm("Reject this request?")) {
            router.delete(route("admin.user-requests.reject", id), {
                onSuccess: () => toast.error("Request Removed"),
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Buyer Requests | Admin" />
            <Toaster position="top-right" />

            <div className="p-6 max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-white flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                            <UserPlus className="text-indigo-500" size={32} />
                        </div>
                        <div>
                            Buyer Onboarding Requests
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                                Review and approve users who want to become
                                official buyers
                            </p>
                        </div>
                    </h1>
                </div>

                {/* Requests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buyerRequests.map((request, i) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl group hover:border-indigo-500/30 transition-all duration-500 relative"
                        >
                            {/* User Profile Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-500 shadow-xl shadow-black/40">
                                    <UserCircle
                                        className="text-slate-400 group-hover:text-white"
                                        size={36}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-lg uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                                        {request.name}
                                    </h3>
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                        Request ID: #BR-{request.id}
                                    </span>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-4 mb-8">
                                <DetailItem
                                    icon={<Mail size={14} />}
                                    label="Email Address"
                                    value={request.email}
                                />
                                <DetailItem
                                    icon={<Phone size={14} />}
                                    label="Contact No"
                                    value={request.phone || "N/A"}
                                />
                                <DetailItem
                                    icon={<Building2 size={14} />}
                                    label="Company / Brand"
                                    value={request.company_name || "N/A"}
                                />
                                <DetailItem
                                    icon={<Calendar size={14} />}
                                    label="Request Date"
                                    value={new Date(
                                        request.created_at,
                                    ).toLocaleDateString()}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleApprove(request.id)}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
                                >
                                    <Check size={16} /> Approve Buyer
                                </button>
                                <button
                                    onClick={() => handleReject(request.id)}
                                    className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-5 py-4 rounded-2xl border border-red-500/10 transition-all active:scale-[0.98]"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Decorative Corner Arrow */}
                            <ArrowUpRight
                                className="absolute top-6 right-6 text-slate-700 group-hover:text-indigo-500 transition-colors"
                                size={24}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {buyerRequests.length === 0 && (
                    <div className="text-center py-20 bg-[#0F1219]/40 border border-dashed border-white/10 rounded-[3rem]">
                        <p className="text-slate-600 font-black uppercase tracking-widest">
                            No pending onboarding requests found.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 border-b border-white/[0.03] pb-3 last:border-0 last:pb-0">
            <div className="mt-1 text-indigo-500/50">{icon}</div>
            <div>
                <p className="text-slate-600 text-[9px] font-black uppercase tracking-tighter mb-0.5">
                    {label}
                </p>
                <p className="text-slate-300 text-xs font-bold">{value}</p>
            </div>
        </div>
    );
}

export default UserRequest;
