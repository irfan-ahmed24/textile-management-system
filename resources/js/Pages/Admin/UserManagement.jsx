import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import UserManagementHeader from "@/Components/Admin/UserManage/UserManagementHeader";
import UsersTable from "@/Components/Admin/UserManage/UsersTable";
import AddUserModal from "@/Components/Admin/UserManage/AddUserModal";
import { usePage } from "@inertiajs/react"; // এটি ইমপোর্ট করুন

function UserManagement() {
    // কন্ট্রোলার থেকে পাঠানো 'users' ডাটা রিসিভ করা হচ্ছে
    const { users } = usePage().props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AdminLayout header="User Management">
            <UserManagementHeader onAddUser={() => setIsModalOpen(true)} />
            <UsersTable users={users} />
            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 10px; }
            `,
                }}
            />
        </AdminLayout>
    );
}

export default UserManagement;
