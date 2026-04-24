import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

export default function TrackOrderStatusPanel({ foundOrder }) {
    if (foundOrder === "not_found") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-red-500/5 border border-dashed border-red-500/20 rounded-[2.5rem]"
            >
                <p className="text-red-500 font-black uppercase tracking-widest text-sm">
                    Order ID Not Found!
                </p>
                <p className="text-slate-600 text-xs mt-2 font-medium">
                    Please check your ID and try again.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem]">
            <Package className="mx-auto text-slate-800 mb-4" size={48} />
            <p className="text-slate-600 font-black uppercase tracking-widest text-sm">
                Ready to Track
            </p>
        </div>
    );
}
