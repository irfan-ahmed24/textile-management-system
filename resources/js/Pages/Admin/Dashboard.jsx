import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import StatsGrid from "@/Components/Admin/Dashboard/StatsGrid";
import SystemActivityLog from "@/Components/Admin/Dashboard/SystemActivityLog";
import StockOverviewCard from "@/Components/Admin/Dashboard/StockOverviewCard";
import { Users, DollarSign, Activity, ShieldAlert } from "lucide-react";

function Dashboard({ dbStats, dbActivities, dbStocks }) {
    // কন্ট্রোলার থেকে আসা ডাটা দিয়ে স্ট্যাটাস অ্যারে তৈরি
    const adminStats = [
        {
            label: "Total Revenue",
            value: `$${dbStats.total_revenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            trend: "+14%",
            isUp: true,
        },
        {
            label: "Total Users",
            value: dbStats.total_users.toLocaleString(),
            icon: Users,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            trend: "+5%",
            isUp: true,
        },
        {
            label: "Pending Approvals",
            value: dbStats.pending_approvals.toString().padStart(2, "0"),
            icon: ShieldAlert,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            trend: "Alert",
            isUp: false,
        },
        {
            label: "Active Production",
            value: dbStats.active_production.toString(),
            icon: Activity,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            trend: "+8%",
            isUp: true,
        },
    ];

    return (
        <AdminLayout header="System Overview">
            {/* ডায়নামিক স্ট্যাটাস গ্রিড */}
            <StatsGrid stats={adminStats} />

            <div className="grid lg:grid-cols-3 gap-8">
                {/* ডাটাবেস থেকে আসা রিসেন্ট অ্যাক্টিভিটি */}
                <SystemActivityLog items={dbActivities} />

                {/* ডাটাবেস থেকে আসা স্টক লেভেল */}
                <StockOverviewCard stocks={dbStocks} />
            </div>
        </AdminLayout>
    );
}

export default Dashboard;
