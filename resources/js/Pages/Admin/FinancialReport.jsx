import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Wallet,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    CreditCard,
    PieChart,
    Download,
} from "lucide-react";

function FinancialReport() {
    // আর্থিক ডাটা সামারি
    const financialStats = [
        {
            label: "Total Asset Value",
            value: "$124,500",
            change: "+12%",
            isUp: true,
            icon: Wallet,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Material Expenses",
            value: "$45,200",
            change: "+5.4%",
            isUp: true,
            icon: CreditCard,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Waste Recovery",
            value: "$3,150",
            change: "-2.1%",
            isUp: false,
            icon: TrendingUp,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
        },
        {
            label: "Pending Payments",
            value: "$12,800",
            change: "Action Required",
            isUp: false,
            icon: DollarSign,
            color: "text-red-500",
            bg: "bg-red-500/10",
        },
    ];

    return (
        <AdminLayout>
            <Head title="Financial Analytics | Admin" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white flex items-center gap-3">
                            <DollarSign
                                className="text-emerald-500"
                                size={32}
                            />
                            Financial Insights
                        </h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                            Overview of inventory valuation and procurement
                            costs
                        </p>
                    </div>
                </div>

                {/* Top Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {financialStats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0F1219]/80 border border-white/5 p-7 rounded-[2.5rem] backdrop-blur-xl shadow-2xl group hover:border-emerald-500/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div
                                    className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
                                >
                                    <stat.icon size={24} />
                                </div>
                                <div
                                    className={`flex items-center gap-1 ${stat.isUp ? "text-emerald-500" : "text-red-500"}`}
                                >
                                    {stat.isUp ? (
                                        <ArrowUpRight size={14} />
                                    ) : (
                                        <ArrowDownRight size={14} />
                                    )}
                                    <span className="text-xs font-black">
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                {stat.label}
                            </p>
                            <h3 className="text-3xl font-black text-white mt-2 tracking-tight">
                                {stat.value}
                            </h3>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Expense Breakdown */}
                    <div className="lg:col-span-2 bg-[#0F1219]/80 border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-white font-black uppercase text-xs tracking-widest flex items-center gap-2">
                                <PieChart
                                    size={18}
                                    className="text-emerald-500"
                                />{" "}
                                Cost Distribution
                            </h3>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">
                                Fiscal Year 2026
                            </span>
                        </div>

                        <div className="space-y-10">
                            <FinanceBar
                                label="Yarn Procurement"
                                amount="$85,000"
                                percent={65}
                                color="bg-emerald-500"
                            />
                            <FinanceBar
                                label="Chemicals & Dyes"
                                amount="$25,000"
                                percent={20}
                                color="bg-blue-500"
                            />
                            <FinanceBar
                                label="Fabric & Accessories"
                                amount="$14,500"
                                percent={15}
                                color="bg-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Quick Action/Summary Card */}
                    <div className="space-y-6">
                        <div className="bg-emerald-600/5 border border-emerald-500/20 rounded-[2.5rem] p-8 shadow-xl">
                            <h4 className="text-white font-black text-xl mb-4 uppercase tracking-tighter">
                                Profit Forecast
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
                                Based on current inventory consumption and
                                production rate, the estimated gross margin for
                                this quarter is projected to increase by 8.5%.
                            </p>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <span className="text-[10px] font-black text-slate-500 uppercase">
                                    Estimated Recovery
                                </span>
                                <p className="text-emerald-500 font-black text-xl mt-1">
                                    +$15,400
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8">
                            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">
                                Recent Large Invoices
                            </h4>
                            <div className="space-y-4">
                                <InvoiceItem
                                    vendor="Rahim Textiles"
                                    amount="$4,500"
                                    status="Paid"
                                />
                                <InvoiceItem
                                    vendor="Global Chemicals"
                                    amount="$2,800"
                                    status="Pending"
                                />
                                <InvoiceItem
                                    vendor="Eco Fabric Hub"
                                    amount="$1,200"
                                    status="Paid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// সাব-কম্পোনেন্ট: খরচ দেখানোর বার
function FinanceBar({ label, amount, percent, color }) {
    return (
        <div>
            <div className="flex justify-between items-end mb-3">
                <div>
                    <p className="text-white font-black text-sm uppercase">
                        {label}
                    </p>
                    <p className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                        Share of total budget
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-white font-black text-lg">{amount}</p>
                    <p
                        className={`${color.replace("bg-", "text-")} text-[10px] font-black uppercase`}
                    >
                        {percent}%
                    </p>
                </div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className={`h-full ${color} shadow-[0_0_15px_rgba(16,185,129,0.2)]`}
                />
            </div>
        </div>
    );
}

// সাব-কম্পোনেন্ট: ছোট ইনভয়েস লিস্ট
function InvoiceItem({ vendor, amount, status }) {
    return (
        <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/5">
            <div>
                <p className="text-white font-bold text-xs uppercase">
                    {vendor}
                </p>
                <p className="text-slate-500 text-[9px] font-black uppercase mt-0.5">
                    {status}
                </p>
            </div>
            <p className="text-white font-black text-xs">{amount}</p>
        </div>
    );
}

export default FinancialReport;
