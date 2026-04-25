import React from "react";
import RunningOrderCard from "@/Components/Production_manager/RunningOrder/RunningOrderCard";

export default function RunningOrdersList({
    filteredOrders = [],
    baseStages = [],
    onUpdateStatus,
}) {
    return (
        <div className="space-y-4">
            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <RunningOrderCard
                        key={order.id}
                        order={order}
                        baseStages={baseStages}
                        onUpdateStatus={onUpdateStatus}
                    />
                ))
            ) : (
                <div className="text-center py-20 bg-[#0F1219]/50 border border-dashed border-white/10 rounded-[2.5rem]">
                    <p className="text-slate-600 font-black uppercase tracking-widest">
                        No active production orders found
                    </p>
                </div>
            )}
        </div>
    );
}
