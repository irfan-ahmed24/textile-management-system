import React from "react";
import ProductionLayout from "@/Layouts/ProductionLayout";
import { Head } from "@inertiajs/react";
import { Activity, CheckCircle2, Timer, Package } from "lucide-react";
import StatsGrid from "@/Components/Production_manager/Dashboard/StatsGrid";
import LiveProductionLine from "@/Components/Production_manager/Dashboard/LiveProductionLine";
import ActiveClientsCard from "@/Components/Production_manager/Dashboard/ActiveClientsCard";
import QuickActionCard from "@/Components/Production_manager/Dashboard/QuickActionCard";

function Dashboard({ stats, liveProduction, buyerSummary }) {
    const prodStats = [
        {
            label: "Running Orders",
            value: stats.running_orders,
            icon: Activity,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            detail: "Live on floor",
        },
        {
            label: "Pending Review",
            value: stats.pending_orders,
            icon: Timer,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            detail: "Awaiting start",
        },
        {
            label: "Items in Process",
            value: stats.total_quantity.toLocaleString(),
            icon: Package,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            detail: "Units processed",
        },
        {
            label: "Completed",
            value: stats.completed_orders,
            icon: CheckCircle2,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            detail: "Ready for delivery",
        },
    ];

    return (
        <ProductionLayout>
            <Head title="Production Manager Dashboard" />

            <StatsGrid stats={prodStats} />

            <div className="grid lg:grid-cols-3 gap-8">
                <LiveProductionLine liveProduction={liveProduction} />

                <div className="space-y-6">
                    <ActiveClientsCard buyerSummary={buyerSummary} />
                    <QuickActionCard />
                </div>
            </div>
        </ProductionLayout>
    );
}

export default Dashboard;
