import React, { useState } from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head, useForm } from "@inertiajs/react";
import OrderRequestHeader from "@/Components/Production_manager/OrderRequest/OrderRequestHeader";
import OrderRequestTable from "@/Components/Production_manager/OrderRequest/OrderRequestTable";
import OrderDetailsModal from "@/Components/Production_manager/OrderRequest/OrderDetailsModal";
import SetQuoteModal from "@/Components/Production_manager/OrderRequest/SetQuoteModal";

function OrderRequest({ runningOrders = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        total_amount: "",
        order_id: "",
    });

    const openDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    const openQuoteModal = (order) => {
        setSelectedOrder(order);
        setData("order_id", order.id);
        setIsQuoteModalOpen(true);
    };

    const handleSendQuote = (e) => {
        e.preventDefault();
        post(route("production.order-request.send-quote"), {
            onSuccess: () => {
                setIsQuoteModalOpen(false);
                reset();
            },
        });
    };

    const handleApprove = (id) => {
        if (confirm("Verify payment and start production for this order?")) {
            post(route("production.order-request.approve", id));
        }
    };

    const filteredOrders = runningOrders.filter(
        (order) =>
            order.id.toString().includes(searchTerm) ||
            order.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <ProductionLayout>
            <Head title="Order Requests" />

            <div className="p-6 max-w-[1400px] mx-auto text-white">
                <OrderRequestHeader
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <OrderRequestTable
                    filteredOrders={filteredOrders}
                    onViewDetails={openDetails}
                    onApprove={handleApprove}
                    onOpenQuote={openQuoteModal}
                />

                <OrderDetailsModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    selectedOrder={selectedOrder}
                    onApprove={handleApprove}
                />

                <SetQuoteModal
                    isOpen={isQuoteModalOpen}
                    onClose={() => setIsQuoteModalOpen(false)}
                    selectedOrder={selectedOrder}
                    data={data}
                    setData={setData}
                    onSubmit={handleSendQuote}
                    processing={processing}
                />
            </div>
        </ProductionLayout>
    );
}

export default OrderRequest;
