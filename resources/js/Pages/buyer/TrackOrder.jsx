import React, { useState, useEffect } from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import TrackOrderSearchHeader from "@/Components/Buyer/TrackOrder/TrackOrderSearchHeader";
import TrackOrderSummaryCard from "@/Components/Buyer/TrackOrder/TrackOrderSummaryCard";
import TrackOrderTimeline from "@/Components/Buyer/TrackOrder/TrackOrderTimeline";
import TrackOrderStatusPanel from "@/Components/Buyer/TrackOrder/TrackOrderStatusPanel";

// নতুন স্টেজ "Order Pending" আইডি ০ হিসেবে যুক্ত করা হয়েছে
const baseStages = [
    { id: 0, name: "Order Pending" },
    { id: 1, name: "Yarn Processing" },
    { id: 2, name: "Knitting / Dyeing" },
    { id: 3, name: "Cutting & Stitching" },
    { id: 4, name: "Quality Check" },
    { id: 5, name: "Ready to Ship" },
];

function TrackOrder({ orders = [] }) {
    const [searchId, setSearchId] = useState("");
    const [foundOrder, setFoundOrder] = useState(null);

    useEffect(() => {
        if (searchId.trim() === "") {
            setFoundOrder(null);
            return;
        }

        const order = orders.find(
            (o) =>
                o.id.toString() ===
                searchId.toLowerCase().replace("#ord-", "").trim(),
        );

        if (order) {
            setFoundOrder(order);
        } else {
            setFoundOrder("not_found");
        }
    }, [searchId, orders]);

    return (
        <BuyerLayout>
            <Head title="Track Your Order" />

            <div className="p-6 max-w-[1000px] mx-auto text-white">
                <TrackOrderSearchHeader
                    searchId={searchId}
                    setSearchId={setSearchId}
                />

                <AnimatePresence mode="wait">
                    {foundOrder && foundOrder !== "not_found" ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <TrackOrderSummaryCard foundOrder={foundOrder} />
                            <TrackOrderTimeline
                                foundOrder={foundOrder}
                                baseStages={baseStages}
                            />
                        </motion.div>
                    ) : (
                        <TrackOrderStatusPanel foundOrder={foundOrder} />
                    )}
                </AnimatePresence>
            </div>
        </BuyerLayout>
    );
}

export default TrackOrder;
