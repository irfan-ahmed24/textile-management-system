import React from "react";
import { Edit2, Trash2, ShieldCheck, UserCircle } from "lucide-react";
import { router } from "@inertiajs/react";

function UsersTable({ users }) {
    const handleDelete = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("admin.users.destroy", userId), {
                onSuccess: () => {
                    alert("User deleted successfully!");
                },
                onError: (err) => {
                    console.error("Delete failed:", err);
                },
            });
        }
    };
    if (!users) {
        return (
            <div className="p-10 text-center text-slate-500 bg-[#080B11] border border-white/5 rounded-[2rem]">
                Loading users...
            </div>
        );
    }

    return (
        <div className="bg-[#080B11] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02] text-slate-400 text-[11px] uppercase tracking-[0.15em] font-bold border-b border-white/5">
                            <th className="px-8 py-5">User</th>
                            <th className="px-6 py-5">Role</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {/* এখানে users?.map ব্যবহার করা হয়েছে (Optional Chaining), 
                            যাতে ডাটা না থাকলেও এরর না দেয় 
                        */}
                        {users?.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="group hover:bg-white/[0.01] transition-colors"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-500 border border-indigo-500/10">
                                                <UserCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-200">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-white/5 px-3 py-1 rounded-lg w-fit">
                                            <ShieldCheck
                                                size={14}
                                                className="text-indigo-500"
                                            />{" "}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                user.status === "Active"
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-red-500/10 text-red-500"
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
                                            ></span>
                                            {user.status || "Active"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-8 py-10 text-center text-slate-500 text-sm italic"
                                >
                                    No users found in database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersTable;
