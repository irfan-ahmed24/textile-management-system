import React, { useState } from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    MoreVertical,
    Package,
    AlertTriangle,
    CheckCircle2,
    ArrowUpDown,
    Download,
} from "lucide-react";

function Materials() {
    // ডিজাইন টেস্ট করার জন্য কিছু ফেক ডাটা
    const materials = [
        {
            id: 1,
            name: "Cotton Yarn 30s",
            code: "YRN-001",
            category: "Yarn",
            stock: 450,
            unit: "KG",
            price: 3.5,
            location: "Floor 1, Sec A",
            status: "In Stock",
        },
        {
            id: 2,
            name: "Polyester Fabric",
            code: "FAB-202",
            category: "Fabric",
            stock: 8,
            unit: "Yards",
            price: 12.0,
            location: "Floor 2, Sec B",
            status: "Low Stock",
        },
        {
            id: 3,
            name: "Reactive Dye Blue",
            code: "CHM-505",
            category: "Chemical",
            stock: 0,
            unit: "KG",
            price: 8.2,
            location: "Chemical Lab",
            status: "Out of Stock",
        },
        {
            id: 4,
            name: "Sewing Thread Red",
            code: "ACC-101",
            category: "Accessories",
            stock: 1200,
            unit: "PCS",
            price: 0.5,
            location: "Floor 1, Sec C",
            status: "In Stock",
        },
    ];

    return (
        <InventoryLayout>
            <Head title="Materials Inventory | TextileMS" />

            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-3">
                            <Package className="text-blue-500" size={28} />
                            Materials Inventory
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                            Manage and track all raw materials and stock levels
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl border border-white/10 transition-all flex items-center gap-2 text-sm font-bold">
                            <Download size={18} /> Export
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all">
                            + Add New Item
                        </button>
                    </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Total Items"
                        value="128"
                        icon={<Package className="text-blue-500" />}
                        color="blue"
                    />
                    <StatCard
                        title="Low Stock Items"
                        value="12"
                        icon={<AlertTriangle className="text-yellow-500" />}
                        color="yellow"
                    />
                    <StatCard
                        title="Out of Stock"
                        value="03"
                        icon={<AlertTriangle className="text-red-500" />}
                        color="red"
                    />
                </div>

                {/* Search and Filter */}
                <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2rem] p-4 mb-6 backdrop-blur-xl flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, code or category..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                    </div>
                    <button className="bg-white/5 border border-white/10 text-slate-400 px-6 py-3 rounded-xl flex items-center gap-2 hover:text-white transition-all">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                {/* Materials Table */}
                <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-6 py-5">Item Details</th>
                                    <th className="px-6 py-5">Category</th>
                                    <th className="px-6 py-5">Stock Level</th>
                                    <th className="px-6 py-5">Unit Price</th>
                                    <th className="px-6 py-5">Location</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {materials.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                                                    {item.name}
                                                </span>
                                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">
                                                    {item.code}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="bg-white/5 text-slate-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-white font-black">
                                                    {item.stock}{" "}
                                                    <small className="text-slate-500">
                                                        {item.unit}
                                                    </small>
                                                </span>
                                                <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${item.stock < 10 ? "bg-red-500" : item.stock < 50 ? "bg-yellow-500" : "bg-green-500"}`}
                                                        style={{
                                                            width: `${Math.min((item.stock / 1000) * 100, 100)}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-white font-bold">
                                            ${item.price}
                                        </td>
                                        <td className="px-6 py-5 text-slate-400 text-xs">
                                            {item.location}
                                        </td>
                                        <td className="px-6 py-5">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-slate-500 hover:text-white p-2 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

// সাব-কম্পোনেন্ট: স্ট্যাট কার্ড
function StatCard({ title, value, icon, color }) {
    const colors = {
        blue: "border-blue-500/20 bg-blue-500/5",
        yellow: "border-yellow-500/20 bg-yellow-500/5",
        red: "border-red-500/20 bg-red-500/5",
    };
    return (
        <div
            className={`p-6 rounded-[2rem] border ${colors[color]} backdrop-blur-xl`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        {title}
                    </p>
                    <h3 className="text-3xl font-black text-white mt-2">
                        {value}
                    </h3>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl">{icon}</div>
            </div>
        </div>
    );
}

// সাব-কম্পোনেন্ট: স্ট্যাটাস ব্যাজ
function StatusBadge({ status }) {
    const styles = {
        "In Stock": "bg-green-500/10 text-green-500",
        "Low Stock": "bg-yellow-500/10 text-yellow-500",
        "Out of Stock": "bg-red-500/10 text-red-500",
    };
    return (
        <span
            className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-tighter ${styles[status]}`}
        >
            {status}
        </span>
    );
}

export default Materials;
