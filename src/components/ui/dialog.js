"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Dialog({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              {onClose ? (
                <button
                  onClick={onClose}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
                >
                  Close
                </button>
              ) : null}
            </div>
            <div className="space-y-4">{children}</div>
            {footer ? <div className="mt-6">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

