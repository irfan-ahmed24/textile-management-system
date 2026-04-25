import React, { useState } from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head } from "@inertiajs/react";
import AllOrderHeader from "@/Components/Production_manager/AllOrder/AllOrderHeader";
import AllOrderTable from "@/Components/Production_manager/AllOrder/AllOrderTable";
import AllOrderFooterInfo from "@/Components/Production_manager/AllOrder/AllOrderFooterInfo";

function AllOrder({ allOrders = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredOrders = allOrders.filter(
        (order) =>
            order.id.toString().includes(searchTerm) ||
            order.order_no.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // স্ট্যাটাস অনুযায়ী কালার সেট করার ফাংশন
    const getStatusStyle = (status) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes("pending"))
            return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        if (lowerStatus.includes("production"))
            return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
        if (lowerStatus.includes("completed"))
            return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    };

    return (
        <ProductionLayout>
            <Head title="Production Master Inventory" />

            <div className="p-6 max-w-[1500px] mx-auto text-white">
                <AllOrderHeader
                    totalRecords={allOrders.length}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <AllOrderTable
                    filteredOrders={filteredOrders}
                    getStatusStyle={getStatusStyle}
                />

                <AllOrderFooterInfo />
            </div>
        </ProductionLayout>
    );
}

export default AllOrder;
