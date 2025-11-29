import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";

const COLORS = ["#6366f1", "#22d3ee", "#f97316", "#a855f7"];

export function AnalyticsLineChart({ data }) {
  return (
    <Card className="h-80 flex flex-col">
      <CardHeader title="Engagement Trends" description="📈 14% growth vs last month" />
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="projection" stroke="#22d3ee" strokeDasharray="5 5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function AnalyticsBarChart({ data }) {
  return (
    <Card className="h-80 flex flex-col">
      <CardHeader title="Channel Performance" description="Comparing paid vs organic sources" />
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="value" fill="url(#barGradient)" radius={[12, 12, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function AnalyticsPieChart({ data }) {
  return (
    <Card className="h-100 flex flex-col">
      <CardHeader title="Audience Mix" description="Breakdown of user cohorts" />
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function WidgetGrid({ widgets, onRemove }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {widgets.map((widget) => (
        <motion.div
          key={widget.id}
          layout
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          whileHover={{ scale: 1.02 }}
          className="cursor-grab"
        >
          <Card>
            <CardHeader title={widget.title} description={widget.description} action={
              <button className="text-xs text-slate-500 hover:text-rose-500" onClick={() => onRemove(widget.id)}>
                Remove
              </button>
            } />
            <p className="text-3xl font-semibold text-slate-900 dark:text-white">{widget.value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{widget.trend}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

