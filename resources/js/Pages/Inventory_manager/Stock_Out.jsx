import React, { useState } from "react";
import InventoryLayout from "../../Layouts/InventoryLayout";
import { Head, useForm } from "@inertiajs/react";
import StockOutHeader from "@/Components/Inventory_manager/Stock_Out/StockOutHeader";
import StockOutScannerModal from "@/Components/Inventory_manager/Stock_Out/StockOutScannerModal";
import StockOutForm from "@/Components/Inventory_manager/Stock_Out/StockOutForm";
import PrecautionCard from "@/Components/Inventory_manager/Stock_Out/PrecautionCard";
import { stockOutReasons } from "@/Components/Inventory_manager/Stock_Out/stockOutData";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

function Stock_Out() {
    const [showScanner, setShowScanner] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        request_id: "",
        item_code: "",
        quantity: "",
        Dept: "",
        reason: "Production",
        note: "",
    });
    const handleScan = (err, result) => {
        if (result) {
            const rawText = result.text.trim();
            if (rawText.includes("REQ_ID")) {
                try {
                    const parts = rawText.split("|");
                    const extractedData = {};

                    console.log("🔍 Extracting Data from QR:", parts);

                    parts.forEach((part) => {
                        const [key, value] = part.split(":");
                        if (key && value) {
                            extractedData[key.trim()] = value.trim();
                        }
                    });

                    setData((prev) => ({
                        ...prev,
                        request_id: extractedData.REQ_ID || "",
                        recipient: extractedData.BY || "",
                        item_code: extractedData.CODE || "",
                        quantity: extractedData.QTY || "",
                        reason: "Production",
                        Dept: extractedData.DEPT || "",
                        note: extractedData.NOTE || "",
                    }));

                    toast.success("Requisition Data Loaded Successfully!", {
                        style: {
                            background: "#0F1219",
                            color: "#10B981",
                            borderRadius: "15px",
                            border: "1px solid rgba(16,185,129,0.2)",
                        },
                    });

                    setShowScanner(false);
                } catch (e) {
                    console.error("❌ Parsing Error:", e);
                    toast.error("Invalid QR Data Format");
                }
            } else {
                // সাধারণ আইটেম কোড বা বারকোড স্ক্যান হলে
                setData("item_code", rawText);
                toast.success("Item Code Loaded");
                setShowScanner(false);
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("inventory.stockOut.store"), {
            onSuccess: () => {
                reset();
                toast.success("Stock Issued Successfully!");
            },
            onError: (err) => {
                toast.error(err.quantity || err.item_code || "Update failed");
            },
        });
    };

    return (
        <InventoryLayout>
            <Head title="Stock Out | TextileMS" />
            <Toaster position="top-right" />

            <div className="p-6 max-w-[1600px] mx-auto relative">
                <StockOutHeader onOpenScanner={() => setShowScanner(true)} />

                <StockOutScannerModal
                    show={showScanner}
                    onClose={() => setShowScanner(false)}
                    onScan={handleScan}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <StockOutForm
                        data={data}
                        setData={setData}
                        submit={submit}
                        processing={processing}
                        errors={errors}
                        reasons={stockOutReasons}
                    />

                    <div className="space-y-6">
                        <PrecautionCard />
                        {data.request_id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-[2rem]"
                            >
                                <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1">
                                    Linked Requisition
                                </p>
                                <p className="text-white font-bold text-lg">
                                    #{data.request_id}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default Stock_Out;
