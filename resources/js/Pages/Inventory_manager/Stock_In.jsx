import React, { useState } from "react";
import InventoryLayout from "../../Layouts/InventoryLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {
    PlusCircle,
    Package,
    Hash,
    Tag,
    Database,
    Weight,
    DollarSign,
    MapPin,
    History,
    ScanLine,
    X,
    AlertCircle,
} from "lucide-react";

function Stock_In() {
    const [showScanner, setShowScanner] = useState(false);

    // ১. Categories এবং Units এর লিস্ট
    const categories = [
        "Yarn",
        "Fabric",
        "Chemicals",
        "Accessories",
        "Packaging",
    ];
    const units = ["KG", "Yards", "PCS", "Rolls", "Lbs"];

    // ২. Inertia useForm হুক (Backend এ ডাটা পাঠানোর জন্য)
    const { data, setData, post, processing, errors, reset } = useForm({
        item_name: "",
        item_code: "",
        category: "",
        quantity: "",
        unit: "KG",
        unit_price: "",
        warehouse_location: "",
    });

    // ৩. QR স্ক্যান করার লজিক
    const handleScan = (err, result) => {
        if (result) {
            // QR ডাটা ফরম্যাট: Name,Code,Category (কমা দিয়ে আলাদা করা)
            const qrData = result.text.split(",");
            if (qrData.length >= 2) {
                setData((prev) => ({
                    ...prev,
                    item_name: qrData[0].trim(),
                    item_code: qrData[1].trim(),
                    category: qrData[2] ? qrData[2].trim() : prev.category,
                }));
            } else {
                setData("item_code", result.text.trim());
            }
            setShowScanner(false);
        }
    };

    // ৪. ফর্ম সাবমিট করার ফাংশন
    const submit = (e) => {
        e.preventDefault();
        post(route("inventory.store"), {
            onSuccess: () => reset(), // সফল হলে ফর্ম ক্লিয়ার হবে
        });
    };

    return (
        <InventoryLayout>
            <Head title="Stock Entry | TextileMS" />

            <div className="p-6 max-w-[1600px] mx-auto relative">
                {/* Header & Scan Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-3">
                            <PlusCircle className="text-blue-500" size={28} />
                            Stock Entry
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                            Manual Entry or Scan QR Code
                        </p>
                    </div>

                    <button
                        onClick={() => setShowScanner(true)}
                        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                        <ScanLine size={20} /> Launch QR Scanner
                    </button>
                </div>

                {/* QR Scanner Modal */}
                <AnimatePresence>
                    {showScanner && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
                        >
                            <button
                                onClick={() => setShowScanner(false)}
                                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={40} />
                            </button>
                            <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-indigo-500/50 shadow-2xl">
                                <BarcodeScannerComponent
                                    width="100%"
                                    height={400}
                                    onUpdate={handleScan}
                                />
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-white text-lg font-bold tracking-widest animate-pulse">
                                    Scanning...
                                </p>
                                <p className="text-slate-500 text-sm mt-2">
                                    Place the QR code inside the frame
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Entry Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl"
                    >
                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Item Code */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                        Item Code / SKU
                                    </label>
                                    <div className="relative">
                                        <Hash
                                            className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.item_code ? "text-red-500" : "text-slate-600"}`}
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            value={data.item_code}
                                            onChange={(e) =>
                                                setData(
                                                    "item_code",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full bg-white/5 border ${errors.item_code ? "border-red-500/50" : "border-white/10"} rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all`}
                                            placeholder="Type or Scan code"
                                        />
                                    </div>
                                    {errors.item_code && (
                                        <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">
                                            {errors.item_code}
                                        </p>
                                    )}
                                </div>

                                {/* Item Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                        Item Name
                                    </label>
                                    <div className="relative">
                                        <Package
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            value={data.item_name}
                                            onChange={(e) =>
                                                setData(
                                                    "item_name",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                            placeholder="Enter item name"
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <Tag
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={18}
                                        />
                                        <select
                                            value={data.category}
                                            onChange={(e) =>
                                                setData(
                                                    "category",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-indigo-500/50 transition-all"
                                        >
                                            <option
                                                value=""
                                                className="bg-[#0F1219]"
                                            >
                                                Select Category
                                            </option>
                                            {categories.map((cat) => (
                                                <option
                                                    key={cat}
                                                    value={cat}
                                                    className="bg-[#0F1219]"
                                                >
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Warehouse Location */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                        Warehouse Location
                                    </label>
                                    <div className="relative">
                                        <MapPin
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            value={data.warehouse_location}
                                            onChange={(e) =>
                                                setData(
                                                    "warehouse_location",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                            placeholder="e.g. Floor 1, Shelf A"
                                        />
                                    </div>
                                </div>

                                {/* Quantity & Unit */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                            Quantity
                                        </label>
                                        <div className="relative">
                                            <Weight
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                                size={18}
                                            />
                                            <input
                                                type="number"
                                                value={data.quantity}
                                                onChange={(e) =>
                                                    setData(
                                                        "quantity",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                            Unit
                                        </label>
                                        <select
                                            value={data.unit}
                                            onChange={(e) =>
                                                setData("unit", e.target.value)
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white appearance-none focus:outline-none focus:border-indigo-500/50 transition-all"
                                        >
                                            {units.map((u) => (
                                                <option
                                                    key={u}
                                                    value={u}
                                                    className="bg-[#0F1219]"
                                                >
                                                    {u}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                        Unit Price ($)
                                    </label>
                                    <div className="relative">
                                        <DollarSign
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                                            size={18}
                                        />
                                        <input
                                            type="number"
                                            value={data.unit_price}
                                            onChange={(e) =>
                                                setData(
                                                    "unit_price",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {processing
                                    ? "Processing..."
                                    : "Complete Stock Entry"}
                                <PlusCircle size={22} />
                            </button>
                        </form>
                    </motion.div>

                    {/* Right Side: Instructions & Help */}
                    <div className="space-y-6">
                        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <ScanLine
                                    className="text-indigo-500"
                                    size={24}
                                />
                                <h3 className="text-white font-black uppercase text-sm tracking-widest">
                                    How to Scan?
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-slate-400 text-xs leading-relaxed">
                                    <span className="text-indigo-500 font-black">
                                        01.
                                    </span>
                                    Click the "Launch QR Scanner" button above.
                                </li>
                                <li className="flex gap-3 text-slate-400 text-xs leading-relaxed">
                                    <span className="text-indigo-500 font-black">
                                        02.
                                    </span>
                                    Allow camera access and point at the item's
                                    QR code.
                                </li>
                                <li className="flex gap-3 text-slate-400 text-xs leading-relaxed">
                                    <span className="text-indigo-500 font-black">
                                        03.
                                    </span>
                                    Data will auto-fill; just enter the quantity
                                    and confirm.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <History className="text-blue-500" size={24} />
                                <h3 className="text-white font-black uppercase text-sm tracking-widest">
                                    Quick Tip
                                </h3>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">
                                For Yarn batches, always check the Warehouse
                                Location to maintain FIFO (First In First Out)
                                system.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default Stock_In;
