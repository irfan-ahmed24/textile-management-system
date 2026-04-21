import React, { useState, useEffect } from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    MoreVertical,
    Package,
    AlertTriangle,
    Download,
} from "lucide-react";

function Materials() {
    // অরিজিনাল ডাটা
    const initialMaterials = [
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

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMaterials, setFilteredMaterials] =
        useState(initialMaterials);

    // সার্চ লজিক
    useEffect(() => {
        const results = initialMaterials.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredMaterials(results);
    }, [searchTerm]);

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
                            Live tracking of your inventory stock
                        </p>
                    </div>

                    {/* Search Bar in Header Area */}
                    <div className="relative w-full md:w-96 group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, code or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0F1219] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-2xl"
                        />
                    </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Total Items"
                        value={filteredMaterials.length}
                        icon={<Package className="text-blue-500" />}
                        color="blue"
                    />
                    <StatCard
                        title="Low Stock Items"
                        value={
                            filteredMaterials.filter(
                                (i) => i.status === "Low Stock",
                            ).length
                        }
                        icon={<AlertTriangle className="text-yellow-500" />}
                        color="yellow"
                    />
                    <StatCard
                        title="Out of Stock"
                        value={
                            filteredMaterials.filter(
                                (i) => i.status === "Out of Stock",
                            ).length
                        }
                        icon={<AlertTriangle className="text-red-500" />}
                        color="red"
                    />
                </div>

                {/* Materials Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-6">Item Details</th>
                                    <th className="px-6 py-6">Category</th>
                                    <th className="px-6 py-6">Stock Level</th>
                                    <th className="px-6 py-6">Unit Price</th>
                                    <th className="px-6 py-6">Location</th>
                                    <th className="px-6 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredMaterials.length > 0 ? (
                                    filteredMaterials.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="group hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors uppercase">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-tighter mt-0.5">
                                                        {item.code}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="bg-white/5 border border-white/5 text-slate-400 text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-wider">
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
                                                    <div className="w-24 h-1.5 bg-white/5 rounded-full mt-2.5 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${item.status === "Out of Stock" ? "bg-red-500" : item.status === "Low Stock" ? "bg-yellow-500" : "bg-green-500"}`}
                                                            style={{
                                                                width: `${item.stock > 0 ? Math.min((item.stock / 1000) * 100, 100) : 100}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-white font-bold">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-5 text-slate-400 text-xs font-medium">
                                                {item.location}
                                            </td>
                                            <td className="px-6 py-5">
                                                <StatusBadge
                                                    status={item.status}
                                                />
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="text-slate-500 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-8 py-20 text-center text-slate-500 font-bold uppercase tracking-widest"
                                        >
                                            No materials found matching "
                                            {searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </InventoryLayout>
    );
}

// সাব-কম্পোনেন্ট: স্ট্যাট কার্ড
function StatCard({ title, value, icon, color }) {
    const colors = {
        blue: "border-blue-500/20 bg-blue-500/5 shadow-blue-500/5",
        yellow: "border-yellow-500/20 bg-yellow-500/5 shadow-yellow-500/5",
        red: "border-red-500/20 bg-red-500/5 shadow-red-500/5",
    };
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-6 rounded-[2.5rem] border ${colors[color]} backdrop-blur-xl shadow-xl transition-all`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        {title}
                    </p>
                    <h3 className="text-3xl font-black text-white mt-3 tracking-tight">
                        {value}
                    </h3>
                </div>
                <div className="p-4 bg-white/5 rounded-[1.5rem] border border-white/5">
                    {icon}
                </div>
            </div>
        </motion.div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        "In Stock": "bg-green-500/10 text-green-500 border-green-500/20",
        "Low Stock": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        "Out of Stock": "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return (
        <span
            className={`text-[9px] px-3 py-1.5 border rounded-lg font-black uppercase tracking-widest ${styles[status]}`}
        >
            {status}
        </span>
    );
}

export default Materials;
