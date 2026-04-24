import React from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head } from "@inertiajs/react";
import {
    Download,
    Printer,
    FileText,
    Calendar,
    User,
    CheckCircle2,
    CreditCard,
} from "lucide-react";

function Invoice({ invoiceData }) {
    // ডামি ডাটা (যদি প্রপস না থাকে তার জন্য)
    const data = invoiceData || {
        invoice_no: "INV-2026-001",
        date: "24 April, 2026",
        due_date: "05 May, 2026",
        buyer_name: "Irfan Ahmed",
        email: "irfan@example.com",
        address: "Narsingdi, Bangladesh",
        items: [
            {
                id: 1,
                name: "Slim Fit Denim Jeans",
                qty: 1000,
                price: 12.5,
                total: 12500,
            },
            {
                id: 2,
                name: "Cotton Polo Shirt",
                qty: 500,
                price: 8.0,
                total: 4000,
            },
        ],
        sub_total: 16500,
        tax: 825,
        total_amount: 17325,
        status: "Paid",
    };

    return (
        <BuyerLayout>
            <Head title="Invoice Detail" />

            <div className="p-6 max-w-[1000px] mx-auto text-white">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                        <FileText className="text-indigo-500" /> Invoice Details
                    </h1>
                    <div className="flex gap-3">
                        <button className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all border border-white/5 text-slate-400 hover:text-white">
                            <Printer size={18} />
                        </button>
                        <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
                            <Download size={16} /> Download PDF
                        </button>
                    </div>
                </div>

                {/* Main Invoice Card */}
                <div className="bg-[#0F1219] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    {/* Top Branding/Status Section */}
                    <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between gap-8 bg-gradient-to-br from-white/[0.02] to-transparent">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">
                                    T
                                </div>
                                <span className="text-2xl font-black tracking-tighter uppercase">
                                    Textile
                                    <span className="text-indigo-500">Hub</span>
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Industrial Area, Dhaka
                                <br />
                                Bangladesh, 1200
                            </p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <span
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border mb-4 ${
                                    data.status === "Paid"
                                        ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                                        : "text-amber-500 border-amber-500/20 bg-amber-500/5"
                                }`}
                            >
                                {data.status}
                            </span>
                            <h2 className="text-3xl font-black text-white">
                                {data.invoice_no}
                            </h2>
                            <p className="text-slate-500 text-xs font-bold uppercase mt-1">
                                Invoice ID
                            </p>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-3 gap-8 p-10 bg-white/[0.01]">
                        <div className="space-y-1">
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                                <User size={12} className="text-indigo-500" />{" "}
                                Billed To
                            </p>
                            <h4 className="text-white font-bold">
                                {data.buyer_name}
                            </h4>
                            <p className="text-slate-500 text-xs">
                                {data.email}
                            </p>
                            <p className="text-slate-500 text-xs">
                                {data.address}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                                <Calendar
                                    size={12}
                                    className="text-indigo-500"
                                />{" "}
                                Dates
                            </p>
                            <p className="text-slate-300 text-sm font-bold">
                                Issued:{" "}
                                <span className="text-slate-500 font-medium">
                                    {data.date}
                                </span>
                            </p>
                            <p className="text-slate-300 text-sm font-bold">
                                Due:{" "}
                                <span className="text-slate-500 font-medium">
                                    {data.due_date}
                                </span>
                            </p>
                        </div>
                        <div className="space-y-1 md:text-right">
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center md:justify-end gap-2 mb-2">
                                <CreditCard
                                    size={12}
                                    className="text-indigo-500"
                                />{" "}
                                Payment Method
                            </p>
                            <p className="text-slate-300 text-sm font-bold uppercase">
                                Stripe Checkout
                            </p>
                            <p className="text-slate-500 text-[10px] font-medium italic">
                                Verified Transaction
                            </p>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="px-10 py-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-white/5">
                                    <th className="pb-4">Description</th>
                                    <th className="pb-4 text-center">
                                        Quantity
                                    </th>
                                    <th className="pb-4 text-right">
                                        Unit Price
                                    </th>
                                    <th className="pb-4 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.items.map((item) => (
                                    <tr key={item.id} className="group">
                                        <td className="py-6 font-bold text-slate-300">
                                            {item.name}
                                        </td>
                                        <td className="py-6 text-center text-slate-400 font-bold">
                                            {item.qty} Pcs
                                        </td>
                                        <td className="py-6 text-right text-slate-400 font-bold">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="py-6 text-right text-white font-black">
                                            ${item.total.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Total Calculation Section */}
                    <div className="p-10 bg-white/[0.02] flex justify-end">
                        <div className="w-full md:w-64 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-bold uppercase text-[10px]">
                                    Subtotal
                                </span>
                                <span className="text-slate-300 font-bold">
                                    ${data.sub_total.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-bold uppercase text-[10px]">
                                    Tax (5%)
                                </span>
                                <span className="text-slate-300 font-bold">
                                    ${data.tax.toLocaleString()}
                                </span>
                            </div>
                            <div className="h-px bg-white/5 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black uppercase text-indigo-500">
                                    Total
                                </span>
                                <span className="text-2xl font-black text-white">
                                    ${data.total_amount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-600">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                        Thank you for your business with TextileHub
                    </p>
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Invoice;
