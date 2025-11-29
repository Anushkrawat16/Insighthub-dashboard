"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/button";

const widgetOptions = [
  { id: "traffic", title: "Traffic" },
  { id: "conversion", title: "Conversion" },
  { id: "retention", title: "Retention" },
  { id: "engagement", title: "Engagement" },
];

export default function WidgetToolbar({ onAdd }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 dark:bg-slate-900/40">
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
        Drag widgets or add new analytics blocks
      </p>
      <div className="flex flex-wrap gap-3">
        {widgetOptions.map((widget) => (
          <motion.div key={widget.id} whileHover={{ scale: 1.05 }}>
            <Button
              variant="subtle"
              size="sm"
              onClick={() => onAdd(widget)}
            >
              + {widget.title}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

