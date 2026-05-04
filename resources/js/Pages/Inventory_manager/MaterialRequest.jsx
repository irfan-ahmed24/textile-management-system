import React, { useState } from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";
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

function MaterialRequest({ requests = [] }) {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (req) => {
        if (req.status === "Approved") {
            setSelectedRequest(req);
            setIsModalOpen(true);
        }
    };

    const handleStatusUpdate = (id, status) => {
        router.patch(
            route("inventory.material-request.update", id),
            { status },
            {
                onSuccess: () =>
                    toast.success(`Request ${status} successfully!`),
            },
        );
    };

    // আপনার ছবির মতো সাদা বর্ডারসহ ডাউনলোড করার ফাংশন
    const downloadQRCode = () => {
        const svg = document.getElementById("request-qr");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // রেজোলিউশন ভালো রাখার জন্য সাইজ সেট করা
            const padding = 40; // সাদা বর্ডারের সাইজ
            canvas.width = img.width + padding;
            canvas.height = img.height + padding;

            // ব্যাকগ্রাউন্ড সাদা করা
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ইমেজ ড্র করা (মাঝখানে রাখা)
            ctx.drawImage(img, padding / 2, padding / 2);

            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `${selectedRequest.id}-GatePass.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Approved":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "Pending":
                return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case "Rejected":
                return "bg-red-500/10 text-red-500 border-red-500/20";
            case "completed":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            default:
                return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    return (
        <InventoryLayout>
            <Head title="Material Requests | Inventory" />
            <Toaster position="top-right" />

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
                            Review and process raw material requisitions from
                            the factory floor
                        </p>
                    </div>
                </div>

                <div className="bg-[#0F1219]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-6">ID</th>
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
                                {requests.length > 0 ? (
                                    requests.map((req) => (
                                        <tr
                                            key={req.id}
                                            className={`group transition-all ${req.status === "Approved" ? "cursor-pointer hover:bg-white/[0.02]" : ""}`}
                                            onClick={() => openModal(req)}
                                        >
                                            <td className="px-8 py-5 text-blue-500 font-black font-mono text-sm">
                                                #{req.id}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-white font-bold block uppercase text-xs">
                                                    {req.item_name}
                                                </span>
                                                <span className="text-[10px] text-slate-500 font-bold uppercase">
                                                    {req.item_code}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center text-slate-400">
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
                                            <td className="px-8 py-5 text-white font-black">
                                                {req.qty}{" "}
                                                <small className="text-slate-500">
                                                    {req.unit}
                                                </small>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span
                                                    className={`text-[9px] px-3 py-1 rounded-lg font-black uppercase tracking-widest border ${getStatusStyle(req.status)}`}
                                                >
                                                    {req.status ===
                                                        "completed" && (
                                                        <PackageCheck
                                                            size={10}
                                                            className="inline mr-1 mb-0.5"
                                                        />
                                                    )}
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right flex justify-end gap-2">
                                                {req.status === "Pending" ? (
                                                    <div
                                                        className="flex gap-2"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    req.id,
                                                                    "approved",
                                                                )
                                                            }
                                                            className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all border border-emerald-500/20"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    req.id,
                                                                    "rejected",
                                                                )
                                                            }
                                                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/20"
                                                        >
                                                            <Ban size={18} />
                                                        </button>
                                                    </div>
                                                ) : req.status ===
                                                  "Approved" ? (
                                                    <button className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/20 transition-all">
                                                        <ArrowUpRight
                                                            size={18}
                                                        />
                                                    </button>
                                                ) : (
                                                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
                                                        Closed
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-10 text-center text-slate-500 font-bold uppercase text-xs"
                                        >
                                            No requests found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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
                                                <p className="text-white font-bold text-sm uppercase">
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
                                    <div className="relative p-2 bg-white rounded-[1.5rem] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden">
                                        <QRCodeSVG
                                            id="request-qr"
                                            // সব তথ্য যুক্ত করা হলো: ID, Item Name, Requester, Dept, Item Code, Qty, Reason
                                            value={`REQ_ID:${selectedRequest.id}|NAME:${selectedRequest.item_name}|BY:${selectedRequest.requested_by}|DEPT:${selectedRequest.dept}|CODE:${selectedRequest.item_code}|QTY:${selectedRequest.qty}|NOTE:${selectedRequest.reason || "N/A"}`}
                                            size={220}
                                            level={"H"}
                                            includeMargin={true}
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
