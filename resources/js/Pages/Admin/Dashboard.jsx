import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import StatsGrid from "@/Components/Admin/Dashboard/StatsGrid";
import SystemActivityLog from "@/Components/Admin/Dashboard/SystemActivityLog";
import StockOverviewCard from "@/Components/Admin/Dashboard/StockOverviewCard";
import { Users, DollarSign, Activity, ShieldAlert } from "lucide-react";

function Dashboard() {
    const adminStats = [
        {
            label: "Total Revenue",
            value: "$54,230",
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            trend: "+14%",
            isUp: true,
        },
        {
            label: "Total Users",
            value: "1,240",
            icon: Users,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            trend: "+5%",
            isUp: true,
        },
        {
            label: "Pending Approvals",
            value: "08",
            icon: ShieldAlert,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            trend: "Alert",
            isUp: false,
        },
        {
            label: "Active Production",
            value: "12",
            icon: Activity,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            trend: "+8%",
            isUp: true,
        },
    ];

    const activityItems = [
        {
            user: "Irfan Ahmed",
            action: "Placed a new order #TX-902",
            time: "2 mins ago",
        },
        {
            user: "Inventory Manager",
            action: "Stock updated: 500kg Cotton Yarn",
            time: "45 mins ago",
        },
        {
            user: "System",
            action: "Backup completed successfully",
            time: "2 hours ago",
        },
    ];

    const stockItems = [
        {
            name: "Cotton Yarn",
            level: 85,
            color: "bg-emerald-500",
        },
        {
            name: "Chemicals",
            level: 40,
            color: "bg-amber-500",
        },
        {
            name: "Grey Fabric",
            level: 92,
            color: "bg-indigo-500",
        },
    ];

    return (
        <AdminLayout header="System Overview">
            <StatsGrid stats={adminStats} />

            <div className="grid lg:grid-cols-3 gap-8">
                <SystemActivityLog items={activityItems} />
                <StockOverviewCard stocks={stockItems} />
            </div>
        </AdminLayout>
    );
}

export default Dashboard;
