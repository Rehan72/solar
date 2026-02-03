import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

const Toaster = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`pointer-events-auto relative group glass p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl flex items-start gap-4 overflow-hidden`}
          >
            {/* Background Glow */}
            <div className={`absolute -inset-1 opacity-20 blur-xl pointer-events-none transition-colors duration-500 ${
              toast.type === "error" ? "bg-red-500" : 
              toast.type === "success" ? "bg-solar-yellow" : 
              "bg-blue-400"
            }`} />

            <div className="relative z-10">
              {toast.type === "error" && (
                <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/20">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              )}
              {toast.type === "success" && (
                <div className="p-2 rounded-xl bg-solar-yellow/20 border border-solar-yellow/20">
                  <CheckCircle className="w-5 h-5 text-solar-yellow" />
                </div>
              )}
              {toast.type === "info" && (
                <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/20">
                  <Info className="w-5 h-5 text-blue-400" />
                </div>
              )}
            </div>

            <div className="flex-1 relative z-10">
              <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-1 leading-none">
                {toast.type || "Notification"}
              </h4>
              <p className="text-sm font-bold text-white leading-tight">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="relative z-10 p-1 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Shimmer Effect */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
