import React, { useState } from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head, useForm } from "@inertiajs/react";
import RunningOrderHeader from "@/Components/Production_manager/RunningOrder/RunningOrderHeader";
import RunningOrdersList from "@/Components/Production_manager/RunningOrder/RunningOrdersList";
import UpdateStatusModal from "@/Components/Production_manager/RunningOrder/UpdateStatusModal";

function RunningOrder({ dbOrders = [], baseStages = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Inertia useForm Hook
    const { data, setData, post, processing, reset, errors } = useForm({
        current_stage_id: "",
        admin_note: "",
    });

    const filteredOrders = dbOrders.filter(
        (order) =>
            order.id.toString().includes(searchTerm) ||
            order.product_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const openUpdateModal = (order) => {
        setSelectedOrder(order);
        setData({
            current_stage_id: order.current_stage_id,
            admin_note: order.admin_note || "",
        });
        setIsModalOpen(true);
    };

    const handleUpdateProgress = (e) => {
        e.preventDefault();
        post(route("production.running-order.update", selectedOrder.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    return (
        <ProductionLayout>
            <Head title="Running Orders" />
            <div className="p-6 max-w-[1400px] mx-auto">
                <RunningOrderHeader
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <RunningOrdersList
                    filteredOrders={filteredOrders}
                    baseStages={baseStages}
                    onUpdateStatus={openUpdateModal}
                />

                <UpdateStatusModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUpdateProgress}
                    baseStages={baseStages}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                />
            </div>
        </ProductionLayout>
    );
}

export default RunningOrder;
