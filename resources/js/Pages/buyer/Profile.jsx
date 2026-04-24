import React from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head, useForm } from "@inertiajs/react";
import ProfileHeader from "@/Components/Buyer/Profile/ProfileHeader";
import ProfileSidebarCard from "@/Components/Buyer/Profile/ProfileSidebarCard";
import ProfileForm from "@/Components/Buyer/Profile/ProfileForm";

// userData প্রোডাকশন কন্ট্রোলার থেকে প্রপস হিসেবে আসছে
function Profile({ userData }) {
    // userData থেকে ডাটা নিয়ে ফর্ম ইনিশিয়ালাইজ করা হয়েছে
    const { data, setData, patch, processing, recentlySuccessful, errors } =
        useForm({
            name: userData?.name || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
            company_name: userData?.company_name || "",
            address: userData?.address || "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <BuyerLayout>
            <Head title="My Profile" />

            <div className="p-6 max-w-[1000px] mx-auto text-white">
                <ProfileHeader userData={userData} />

                <div className="grid lg:grid-cols-3 gap-8">
                    <ProfileSidebarCard userData={userData} />
                    <ProfileForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        recentlySuccessful={recentlySuccessful}
                        processing={processing}
                    />
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Profile;
