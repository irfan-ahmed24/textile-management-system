import React, { useState } from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head, useForm, router } from "@inertiajs/react";
import OrdersHeader from "@/Components/Buyer/Orders/OrdersHeader";
import OrdersTable from "@/Components/Buyer/Orders/OrdersTable";
import NewOrderModal from "@/Components/Buyer/Orders/NewOrderModal";

function MyOrder({ runningOrders = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    // --- ডাটা হ্যান্ডলিং (Inertia Form) ---
    const { data, setData, post, processing, reset, errors } = useForm({
        product_name: "",
        fabric_type: "Single Jersey (Cotton)",
        total_quantity: "",
        priority_level: "Standard Delivery",
        target_delivery: "",
        size_breakdown: { S: 0, M: 0, L: 0, XL: 0 },
        special_instructions: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("buyer.orders.store"), {
            onSuccess: () => {
                reset();
                setIsOrderModalOpen(false);
            },
        });
    };

    const handleCancelOrder = (id) => {
        if (confirm("Are you sure you want to cancel this order?")) {
            router.delete(route("buyer.orders.destroy", id));
        }
    };

    const filteredOrders = runningOrders.filter(
        (order) =>
            order.id.toString().includes(searchTerm) ||
            order.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <BuyerLayout>
            <Head title="My Orders" />

            <div className="p-6 max-w-[1200px] mx-auto text-white">
                <OrdersHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setIsOrderModalOpen={setIsOrderModalOpen}
                />

                <OrdersTable
                    filteredOrders={filteredOrders}
                    handleCancelOrder={handleCancelOrder}
                />

                <NewOrderModal
                    isOrderModalOpen={isOrderModalOpen}
                    setIsOrderModalOpen={setIsOrderModalOpen}
                    handleSubmit={handleSubmit}
                    data={data}
                    setData={setData}
                    processing={processing}
                />
            </div>
        </BuyerLayout>
    );
}

export default MyOrder;
