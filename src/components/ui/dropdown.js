"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((prev) => !prev)}>{trigger}</button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-white/90 p-2 backdrop-blur dark:bg-slate-900/80"
          >
            {children({ close: () => setOpen(false) })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

