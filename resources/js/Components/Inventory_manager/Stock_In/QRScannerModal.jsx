import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { X } from "lucide-react";

export default function QRScannerModal({ show, onClose, onScan }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={40} />
                    </button>
                    <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-indigo-500/50 shadow-2xl">
                        <BarcodeScannerComponent
                            width="100%"
                            height={400}
                            onUpdate={onScan}
                        />
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-white text-lg font-bold tracking-widest animate-pulse">
                            Scanning...
                        </p>
                        <p className="text-slate-500 text-sm mt-2">
                            Place the QR code inside the frame
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
