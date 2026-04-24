import React from "react";
import { User } from "lucide-react";

export default function ProfileHeader({ userData }) {
    return (
        <div className="mb-10">
            <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                <User className="text-indigo-500" /> Account Settings
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">
                Data Fetched from Database: USR-{userData?.id}
            </p>
        </div>
    );
}
