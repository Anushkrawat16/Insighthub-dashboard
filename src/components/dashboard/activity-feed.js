import { Card, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export default function ActivityFeed({ activities }) {
  return (
    <Card>
      <CardHeader title="Recent Activity" description="Live event stream synced with ActivityLog" />
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-2xl bg-white/5 p-4 dark:bg-slate-900/40"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {activity.action}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activity.context}
              </p>
            </div>
            <div className="text-right">
              <Badge>{activity.label}</Badge>
              <time
                dateTime={activity.createdAt}
                suppressHydrationWarning
                className="text-xs text-slate-400 block"
              >
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </time>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

