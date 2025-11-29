"use client";

import { useMemo, useState, useTransition } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import WidgetToolbar from "./widget-toolbar";
import { Card, CardHeader } from "@/components/ui/card";
import { AnalyticsLineChart, AnalyticsBarChart, AnalyticsPieChart } from "./charts";
import ActivityFeed from "./activity-feed";
import Button from "@/components/ui/button";
import { createWidget, removeWidget } from "@/app/actions/dashboard";
import { motion } from "framer-motion";
import Badge from "@/components/ui/badge";

const seedValue = (key) => {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 100);
};

const uploadDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const formatUploadDate = (date) => uploadDateFormatter.format(new Date(date));

export default function DashboardClient({ data }) {
  const [widgets, setWidgets] = useState(
    data?.user?.widgets?.length
      ? data.user.widgets.map((widget) => ({
          id: widget.id,
          title: widget.type,
          value: `${seedValue(widget.id)}%`,
          trend: "Realtime sync activated",
        }))
      : [
          { id: "users", title: "Active Users", value: "12,450", trend: "+12% vs last week" },
          { id: "traffic", title: "Traffic", value: "1.2M", trend: "+8% organic" },
        ]
  );
  
  const [isPending, startTransition] = useTransition();

  const metrics = useMemo(
    () => [
      { label: "Total Users", value: "12,450", delta: "+12%", accent: "from-sky-500 to-blue-500" },
      { label: "Traffic", value: "1.2M", delta: "+8%", accent: "from-emerald-500 to-cyan-500" },
      { label: "Conversions", value: "4.8%", delta: "+1.4%", accent: "from-fuchsia-500 to-purple-500" },
      { label: "Revenue", value: "$42K", delta: "+6%", accent: "from-amber-500 to-orange-500" },
    ],
    []
  );

  const handleAddWidget = (option) => {
    const metricValue = `${seedValue(option.id + widgets.length)}%`;
    const widget = {
      id: `${option.id}-${Date.now()}`,
      title: option.title,
      value: metricValue,
      trend: "Custom metric",
    };
    setWidgets((prev) => [...prev, widget]);
    startTransition(() => createWidget(option.title).catch(console.error));
  };

  const handleRemoveWidget = (id) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
    startTransition(() => removeWidget(id).catch(() => {}));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(widgets);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setWidgets(reordered);
  };

  const chartData = [
    { label: "Mon", value: 120, projection: 130 },
    { label: "Tue", value: 150, projection: 147 },
    { label: "Wed", value: 170, projection: 168 },
    { label: "Thu", value: 200, projection: 210 },
    { label: "Fri", value: 220, projection: 230 },
    { label: "Sat", value: 180, projection: 190 },
    { label: "Sun", value: 210, projection: 215 },
  ];

  const barData = [
    { label: "Paid", value: 65 },
    { label: "Organic", value: 40 },
    { label: "Referral", value: 24 },
    { label: "Communities", value: 31 },
    { label: "Advocacy", value: 16 },
  ];

  const pieData = [
    { name: "Product", value: 40 },
    { name: "Marketing", value: 25 },
    { name: "Customer Success", value: 20 },
    { name: "Sales", value: 15 },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
      
          <h1 className="text-3xl font-semibold">AI Powered Analytics Dashboard</h1>
          <p className="text-sm text-slate-500">
            Connected as {data?.user?.email} · Role: {data?.user?.role}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="subtle">Share report</Button>
          <Button>Create Report</Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/10 bg-white/80 p-6 shadow-2xl dark:bg-slate-900/60"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="text-3xl font-semibold text-slate-900 dark:text-white">
              {metric.value}
            </p>
            <p className="text-xs text-emerald-500">{metric.delta}</p>
            <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${metric.accent}`} />
          </motion.div>
        ))}
      </div>

      <WidgetToolbar onAdd={handleAddWidget} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-wrap gap-4"
            >
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(dragProvided) => (
                    <motion.div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      layout
                      whileHover={{ scale: 1.01 }}
                      className="w-full flex-1 min-w-[240px] rounded-3xl border border-white/10 bg-white/70 p-5 dark:bg-slate-900/60"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">{widget.title}</p>
                          <p className="text-2xl font-semibold">{widget.value}</p>
                          <p className="text-xs text-slate-400">{widget.trend}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveWidget(widget.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>  
          )}
        </Droppable>
      </DragDropContext>
      {isPending ? (
        <p className="text-sm text-slate-500">Syncing widgets…</p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <AnalyticsLineChart data={chartData} />
        <AnalyticsBarChart data={barData} />
      </div>
      <AnalyticsPieChart data={pieData} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader
            title="Recent Uploads"
            description="Preview of latest CSV / Excel ingestions"
            action={<Badge>{data?.user?.uploads?.length ?? 0} files</Badge>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-3">Title</th>
                  <th>Rows</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {(data?.user?.uploads ?? []).map((upload) => (
                  <tr key={upload.id} className="border-t border-white/10">
                    <td className="py-3">{upload.title}</td>
                    <td>{upload.rowCount}</td>
                    <td>{formatUploadDate(upload.createdAt)}</td>
                  </tr>
                ))}
                {!data?.user?.uploads?.length ? (
                  <tr>
                    <td className="py-3" colSpan={3}>
                      No uploads yet — try ingesting data from the Data Upload page.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </Card>
        <ActivityFeed
          activities={
            (data?.user?.activities ?? []).map((activity) => ({
              id: activity.id,
              action: activity.action,
              context: JSON.stringify(activity.context ?? {}),
              createdAt: activity.createdAt,
              label: "Activity",
            })) || []
          }
        />
      </div>
    </div>
  );
}

