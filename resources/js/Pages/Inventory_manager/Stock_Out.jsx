import React, { useState } from "react";
import InventoryLayout from "../../Layouts/InventoryLayout";
import { Head, useForm } from "@inertiajs/react";
import StockOutHeader from "@/Components/Inventory_manager/Stock_Out/StockOutHeader";
import StockOutScannerModal from "@/Components/Inventory_manager/Stock_Out/StockOutScannerModal";
import StockOutForm from "@/Components/Inventory_manager/Stock_Out/StockOutForm";
import PrecautionCard from "@/Components/Inventory_manager/Stock_Out/PrecautionCard";
import InventoryStatusCard from "@/Components/Inventory_manager/Stock_Out/InventoryStatusCard";
import {
    stockOutReasons,
    inventoryStatusItems,
} from "@/Components/Inventory_manager/Stock_Out/stockOutData";

// Toast ইমপোর্ট
import toast, { Toaster } from "react-hot-toast";

function Stock_Out() {
    const [showScanner, setShowScanner] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        item_code: "",
        quantity: "",
        recipient: "",
        reason: "Production",
        note: "",
    });

    const handleScan = (err, result) => {
        if (result) {
            setData("item_code", result.text.trim());
            setShowScanner(false);
            toast.success("Code Scanned Successfully", {
                style: {
                    background: "#0F1219",
                    color: "#fff",
                    borderRadius: "15px",
                    border: "1px solid rgba(255,255,255,0.1)",
                },
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // নিশ্চিত করুন যে রাউট নাম আপনার 'routes/inventory.php' এর সাথে মিল আছে
        post(route("inventory.stockOut.store"), {
            onSuccess: () => {
                reset();
                toast.success("Stock Issued Successfully!", {
                    style: {
                        background: "#0F1219",
                        color: "#fff",
                        borderRadius: "15px",
                        border: "1px solid rgba(255,255,255,0.1)",
                    },
                });
            },
            onError: (err) => {
                // কন্ট্রোলার থেকে আসা ইনসাফিসিয়েন্ট স্টক এরর হ্যান্ডলিং
                if (err.quantity) {
                    toast.error(err.quantity, {
                        style: {
                            background: "#0F1219",
                            color: "#ff4b4b",
                            borderRadius: "15px",
                            border: "1px solid rgba(255,0,0,0.2)",
                        },
                    });
                } else {
                    toast.error("Failed to update inventory.");
                }
            },
        });
    };

    return (
        <InventoryLayout>
            <Head title="Stock Out | TextileMS" />

            {/* পপআপ রেন্ডার করার জন্য */}
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
                        <InventoryStatusCard items={inventoryStatusItems} />
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default Stock_Out;
