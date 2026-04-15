import React from "react";
import { UserPlus } from "lucide-react";

function UserManagementHeader({ onAddUser }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h2 className="text-xl font-bold text-white">System Users</h2>
                <p className="text-slate-500 text-sm">
                    Manage all users and their access roles here.
                </p>
            </div>
            <button
                onClick={onAddUser}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
            >
                <UserPlus size={18} /> Add New User
            </button>
        </div>
    );
}

export default UserManagementHeader;
