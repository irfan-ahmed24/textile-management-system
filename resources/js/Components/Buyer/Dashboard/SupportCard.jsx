import React from "react";
import { AlertCircle, MessageSquare } from "lucide-react";

function SupportCard() {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 shadow-xl shadow-indigo-500/10 relative overflow-hidden group border border-white/10">
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                    <MessageSquare className="text-white" size={24} />
                </div>

                <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                    Direct Support
                </h2>

                <p className="text-indigo-100 text-xs font-medium mb-6 leading-relaxed opacity-80">
                    অর্ডারের কাস্টমাইজেশন বা প্রোডাকশন আপডেট নিয়ে কোনো প্রশ্ন
                    থাকলে সরাসরি ফ্লোর ম্যানেজারের সাথে কথা বলুন।
                </p>

                <button
                    onClick={() =>
                        (window.location.href = "mailto:support@textile.com")
                    }
                    className="w-full bg-white text-indigo-600 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-black/10"
                >
                    <AlertCircle size={16} /> Contact Manager
                </button>
            </div>

            {/* Background Decorations */}
            <div className="absolute -right-12 -bottom-12 h-48 w-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -left-10 -top-10 h-32 w-32 bg-indigo-400/10 rounded-full blur-2xl group-hover:translate-x-10 transition-transform duration-700"></div>
        </div>
    );
}

export default SupportCard;
