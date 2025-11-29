"use client";

import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { motion } from "framer-motion";

export default function DashboardShell({ children }) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] gap-6 overflow-hidden p-4 lg:grid-cols-[260px_1fr] lg:grid-rows-1 lg:p-8">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6 overflow-y-auto"
      >
        <Navbar />
        <div className="flex-1 rounded-4xl bg-gradient-to-br from-white/60 to-white/30 p-6 backdrop-blur-xl dark:from-slate-900/60 dark:to-slate-900/30">
          {children}
        </div>
      </motion.main>
    </div>
  );
}

