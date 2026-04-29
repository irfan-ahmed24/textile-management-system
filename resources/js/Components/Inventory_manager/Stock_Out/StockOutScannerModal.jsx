import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { X } from "lucide-react";

export default function StockOutScannerModal({ show, onClose, onScan }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={40} />
                    </button>

                    <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-red-500/50 shadow-2xl bg-black relative">
                        <BarcodeScannerComponent
                            width="100%"
                            height={400}
                            onUpdate={onScan} // এখানে সরাসরি onScan পাস করা হয়েছে যা মেইন পেজের handleScan কল করবে
                        />

                        {/* স্ক্যানিং এরিয়া হাইলাইটার */}
                        <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none flex items-center justify-center">
                            <div className="w-64 h-64 border-2 border-red-500 rounded-3xl"></div>
                        </div>
                    </div>

                    <p className="text-white mt-8 font-bold tracking-[0.2em] animate-pulse uppercase">
                        Scanning Code...
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
