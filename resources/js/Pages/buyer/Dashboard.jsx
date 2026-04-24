import BuyerLayout from "@/Layouts/BuyerLayout";
import React from "react";
import LatestInvoices from "@/Components/Buyer/Dashboard/LatestInvoices";
import RecentOrders from "@/Components/Buyer/Dashboard/RecentOrders";
import StatsGrid from "@/Components/Buyer/Dashboard/StatsGrid";
import SupportCard from "@/Components/Buyer/Dashboard/SupportCard";
import { Head } from "@inertiajs/react";

function Dashboard({ stats, recentOrders }) {
    return (
        <BuyerLayout header="Overview">
            <Head title="Buyer Dashboard" />

            {/* পরিসংখ্যান কার্ডগুলো এখানে ডাটা পাবে */}
            <StatsGrid stats={stats} />

            <div className="grid lg:grid-cols-3 gap-8 mt-8">
                {/* রিসেন্ট অর্ডার টেবিল (বাম পাশে ২ কলাম জুড়ে) */}
                <div className="lg:col-span-2">
                    <RecentOrders orders={recentOrders} />
                </div>

                {/* সাপোর্ট এবং ইনভয়েস (ডান পাশে ১ কলাম জুড়ে) */}
                <div className="space-y-6">
                    <SupportCard />
                    <LatestInvoices />
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Dashboard;
