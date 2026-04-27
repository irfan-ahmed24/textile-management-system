import React, { useState } from "react";
import InventoryLayout from "../../Layouts/InventoryLayout";
import { Head, useForm } from "@inertiajs/react";
import StockInHeader from "@/Components/Inventory_manager/Stock_In/StockInHeader";
import QRScannerModal from "@/Components/Inventory_manager/Stock_In/QRScannerModal";
import StockInForm from "@/Components/Inventory_manager/Stock_In/StockInForm";
import ScanGuideCard from "@/Components/Inventory_manager/Stock_In/ScanGuideCard";
import QuickTipCard from "@/Components/Inventory_manager/Stock_In/QuickTipCard";
import {
    categories,
    units,
} from "@/Components/Inventory_manager/Stock_In/stockInData";

// Toast ইমপোর্ট করুন
import toast, { Toaster } from "react-hot-toast";

function Stock_In() {
    const [showScanner, setShowScanner] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        item_name: "",
        item_code: "",
        category: "",
        quantity: "",
        unit: "KG",
        unit_price: "",
        warehouse_location: "",
    });

    const handleScan = (err, result) => {
        if (result) {
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
            toast.success("QR Code Scanned!", {
                style: {
                    borderRadius: "15px",
                    background: "#1F2937",
                    color: "#fff",
                },
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("inventory.stockIn.store"), {
            onSuccess: () => {
                reset();
                toast.success("Inventory Updated Successfully!", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        borderRadius: "20px",
                        background: "#0F1219",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "16px",
                        fontWeight: "bold",
                    },
                    iconTheme: {
                        primary: "#3b82f6",
                        secondary: "#fff",
                    },
                });
            },
            onError: () => {
                toast.error("Submission Failed! Check details.", {
                    style: {
                        borderRadius: "20px",
                        background: "#0F1219",
                        color: "#fff",
                        border: "1px solid rgba(255,0,0,0.2)",
                    },
                });
            },
        });
    };

    return (
        <InventoryLayout>
            <Head title="Stock Entry | TextileMS" />

            {/* Toast Container */}
            <Toaster />

            <div className="p-6 max-w-[1600px] mx-auto relative">
                <StockInHeader onOpenScanner={() => setShowScanner(true)} />

                <QRScannerModal
                    show={showScanner}
                    onClose={() => setShowScanner(false)}
                    onScan={handleScan}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <StockInForm
                        data={data}
                        setData={setData}
                        submit={submit}
                        processing={processing}
                        errors={errors}
                        categories={categories}
                        units={units}
                    />

                    <div className="space-y-6">
                        <ScanGuideCard />
                        <QuickTipCard />
                    </div>
                </div>
            </div>
        </InventoryLayout>
    );
}

export default Stock_In;
