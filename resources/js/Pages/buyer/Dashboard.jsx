import BuyerLayout from "@/Layouts/BuyerLayout";
import React from "react";
import LatestInvoices from "@/Components/Buyer/Dashboard/LatestInvoices";
import RecentOrders from "@/Components/Buyer/Dashboard/RecentOrders";
import StatsGrid from "@/Components/Buyer/Dashboard/StatsGrid";
import SupportCard from "@/Components/Buyer/Dashboard/SupportCard";

function Dashboard() {
    return (
        <BuyerLayout header="Overview">
            <StatsGrid />
            <div className="grid lg:grid-cols-3 gap-8">
                <RecentOrders />
                <div className="space-y-6">
                    <SupportCard />
                    <LatestInvoices />
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Dashboard;
