import React from "react";
import { Search } from "lucide-react";

export default function TrackOrderSearchHeader({ searchId, setSearchId }) {
    return (
        <div className="text-center mb-12">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
                Track Manufacturing Progress
            </h1>
            <p className="text-slate-500 text-sm font-medium">
                Enter your Order ID to see real-time production status
            </p>

            <div className="mt-8 flex max-w-md mx-auto gap-2">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Order ID (e.g. 102)..."
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    />
                </div>
            </div>
        </div>
    );
}
