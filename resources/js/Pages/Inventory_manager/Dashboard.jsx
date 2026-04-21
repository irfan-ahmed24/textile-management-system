import React from "react";
import InventoryLayout from "@/Layouts/InventoryLayout";
import StatsGrid from "@/Components/Inventory_manager/Dashboard/StatsGrid";
import MovementLogs from "@/Components/Inventory_manager/Dashboard/MovementLogs";
import StorageHealth from "@/Components/Inventory_manager/Dashboard/StorageHealth";

function Dashboard({ inventoryStats, movementLogs, storageHealth }) {
    return (
        <InventoryLayout header="Inventory Overview">
            <StatsGrid stats={inventoryStats} />

            <div className="grid lg:grid-cols-3 gap-8 mt-8">
                <MovementLogs logs={movementLogs} />
                <div className="space-y-6">
                    <StorageHealth sections={storageHealth} />
                </div>
            </div>
        </InventoryLayout>
    );
}

export default Dashboard;
