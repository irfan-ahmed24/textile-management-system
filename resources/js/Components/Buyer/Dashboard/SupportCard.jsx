import React from "react";
import { AlertCircle } from "lucide-react";

function SupportCard() {
    return (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl shadow-blue-600/10 relative overflow-hidden group">
            <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-2">
                    Need Help?
                </h2>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                    আপনার অর্ডারের কোনো সমস্যা হলে বা নতুন কাস্টমাইজেশন লাগলে
                    সরাসরি আমাদের ম্যানেজারের সাথে যোগাযোগ করুন।
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                    <AlertCircle size={18} /> Contact Support
                </button>
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>
    );
}

export default SupportCard;
