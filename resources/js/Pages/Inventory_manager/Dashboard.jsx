import React from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import StatsGrid from "@/Components/Inventory_manager/Dashboard/StatsGrid";
import MovementLogs from "@/Components/Inventory_manager/Dashboard/MovementLogs";
import CriticalLowStock from "@/Components/Inventory_manager/Dashboard/CriticalLowStock";
import StorageHealth from "@/Components/Inventory_manager/Dashboard/StorageHealth";
import {
    inventoryStats,
    movementLogs,
    criticalLowStockItems,
    storageHealth,
} from "@/Components/Inventory_manager/Dashboard/dashboardData";

function Dashboard() {
    return (
        <InventoryLayout header="Inventory Overview">
            <StatsGrid stats={inventoryStats} />

            <div className="grid lg:grid-cols-3 gap-8">
                <MovementLogs logs={movementLogs} />

                <div className="space-y-6">
                    <CriticalLowStock items={criticalLowStockItems} />
                    <StorageHealth sections={storageHealth} />
                </div>
            </div>
        </InventoryLayout>
    );
}

export default Dashboard;
