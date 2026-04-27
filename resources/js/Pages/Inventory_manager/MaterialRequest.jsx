import React, { useState } from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
    PackageSearch,
    Clock,
    FileText,
    CheckCircle2,
    X,
    Download,
    Hash,
    User,
    ArrowUpRight,
    Check,
    Ban,
    PackageCheck,
} from "lucide-react";

function MaterialRequest() {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ডামি ডাটা (আপনার ডাটাবেস থেকে আসা ডাটার ফরম্যাট এমন হতে পারে)
    const requests = [
        {
            id: "REQ-9921",
            item_name: "Cotton Yarn 30s",
            item_code: "MTR-101",
            qty: "150",
            unit: "KG",
            requested_by: "Irfan Ahmed",
            dept: "Knitting Floor",
            date: "25 Apr, 2026",
            status: "Pending", // Pending থাকলে বাটন দেখাবে
            reason: "Urgent production for Order #ORD-771",
        },
        {
            id: "REQ-9925",
            item_name: "Polyester Thread",
            item_code: "MTR-205",
            qty: "40",
            unit: "Rolls",
            requested_by: "Manager Zubair",
            dept: "Stitching Unit",
            date: "24 Apr, 2026",
            status: "Approved", // Approved থাকলে QR ওপেন হবে
            reason: "Regular replenishment",
        },
        {
            id: "REQ-9930",
            item_name: "Indigo Dye",
            item_code: "MTR-402",
            qty: "10",
            unit: "KG",
            requested_by: "Irfan Ahmed",
            dept: "Dyeing Unit",
            date: "26 Apr, 2026",
            status: "Stock Out", // স্টক আউট স্ট্যাটাস
            reason: "Production started",
        },
    ];

    const openModal = (req) => {
        if (req.status === "Approved") {
            setSelectedRequest(req);
            setIsModalOpen(true);
        }
    };

    const downloadQRCode = () => {
        const svg = document.getElementById("request-qr");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `${selectedRequest.id}-QR.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    // স্ট্যাটাস কালার হ্যান্ডলার
    const getStatusStyle = (status) => {
        switch (status) {
            case "Approved":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "Pending":
                return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case "Rejected":
                return "bg-red-500/10 text-red-500 border-red-500/20";
            case "Stock Out":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            default:
                return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    return (
        <InventoryLayout>
            <Head title="Material Requests | Inventory" />

            <div className="p-6 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-3">
                            <PackageSearch
                                className="text-blue-500"
                                size={28}
                            />
                            Production Material Requests
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                            Review and process raw material requisitions
                        </p>
                    </div>
                </div>

                <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-6">
                                        Requisition ID
                                    </th>
                                    <th className="px-8 py-6">
                                        Material Details
                                    </th>
                                    <th className="px-8 py-6">Requested By</th>
                                    <th className="px-8 py-6">Quantity</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {requests.map((req) => (
                                    <tr
                                        key={req.id}
                                        className={`group transition-all ${req.status === "Approved" ? "cursor-pointer hover:bg-white/[0.02]" : ""}`}
                                        onClick={() => openModal(req)}
                                    >
                                        <td className="px-8 py-5">
                                            <span className="text-blue-500 font-black font-mono text-sm">
                                                #{req.id}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-white font-bold block">
                                                {req.item_name}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                                                {req.item_code}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center border border-white/5 text-slate-400">
                                                    <User size={14} />
                                                </div>
                                                <div>
                                                    <span className="text-slate-300 text-sm font-bold block leading-none">
                                                        {req.requested_by}
                                                    </span>
                                                    <span className="text-[9px] text-slate-600 font-bold uppercase">
                                                        {req.dept}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-white font-black">
                                                {req.qty}{" "}
                                                <small className="text-slate-500">
                                                    {req.unit}
                                                </small>
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span
                                                className={`text-[9px] px-3 py-1 rounded-lg font-black uppercase tracking-widest border ${getStatusStyle(req.status)}`}
                                            >
                                                {req.status === "Stock Out" && (
                                                    <PackageCheck
                                                        size={10}
                                                        className="inline mr-1 mb-0.5"
                                                    />
                                                )}
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div
                                                className="flex justify-end gap-2"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                {req.status === "Pending" ? (
                                                    <>
                                                        <button
                                                            className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all border border-emerald-500/20"
                                                            title="Approve"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                        <button
                                                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/20"
                                                            title="Reject"
                                                        >
                                                            <Ban size={18} />
                                                        </button>
                                                    </>
                                                ) : req.status ===
                                                  "Approved" ? (
                                                    <button className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        <ArrowUpRight
                                                            size={18}
                                                        />
                                                    </button>
                                                ) : (
                                                    <span className="text-[10px] font-black text-slate-700 uppercase px-2 py-1">
                                                        ARCHIVED
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Request Detail & QR Pop-up (Only for Approved) */}
            <AnimatePresence>
                {isModalOpen && selectedRequest && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-[#0F1219] border border-white/10 w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors z-20"
                            >
                                <X />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-12 border-r border-white/5">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                                Approved Request
                                            </h2>
                                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                                Ready for Dispatch
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                <p className="text-slate-500 text-[9px] font-black uppercase mb-1">
                                                    Item Name
                                                </p>
                                                <p className="text-white font-bold text-sm">
                                                    {selectedRequest.item_name}
                                                </p>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                <p className="text-slate-500 text-[9px] font-black uppercase mb-1">
                                                    Item Code
                                                </p>
                                                <p className="text-blue-500 font-bold text-sm font-mono">
                                                    {selectedRequest.item_code}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <p className="text-slate-500 text-[9px] font-black uppercase mb-1">
                                                Requested By
                                            </p>
                                            <p className="text-white font-bold">
                                                {selectedRequest.requested_by}
                                            </p>
                                            <p className="text-slate-400 text-xs font-medium">
                                                {selectedRequest.dept} •{" "}
                                                {selectedRequest.date}
                                            </p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <p className="text-slate-500 text-[9px] font-black uppercase mb-1">
                                                Total Quantity
                                            </p>
                                            <p className="text-white font-black text-2xl">
                                                {selectedRequest.qty}{" "}
                                                <span className="text-xs text-slate-500">
                                                    {selectedRequest.unit}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                                            <p className="text-emerald-500/80 text-[9px] font-black uppercase mb-1 flex items-center gap-1">
                                                <Clock size={10} /> Note
                                            </p>
                                            <p className="text-slate-300 text-xs italic">
                                                "{selectedRequest.reason}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-12 bg-white/[0.02] flex flex-col items-center justify-center text-center">
                                    <div className="relative p-6 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(16,185,129,0.15)]">
                                        <QRCodeSVG
                                            id="request-qr"
                                            value={`REQ_ID:${selectedRequest.id}|CODE:${selectedRequest.item_code}|QTY:${selectedRequest.qty}`}
                                            size={200}
                                            level={"H"}
                                        />
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-white font-black text-lg uppercase tracking-tight">
                                            Gate Pass Active
                                        </h3>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 mb-8 max-w-[200px] mx-auto">
                                            Scan this code at the warehouse gate
                                            to confirm Stock-Out
                                        </p>
                                        <button
                                            onClick={downloadQRCode}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 uppercase text-xs tracking-widest"
                                        >
                                            <Download size={18} /> Download QR
                                            Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </InventoryLayout>
    );
}

export default MaterialRequest;
