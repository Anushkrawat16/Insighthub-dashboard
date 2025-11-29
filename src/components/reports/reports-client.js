"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import jsPDF from "jspdf";
import Papa from "papaparse";

export default function ReportsClient({ data }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = data.filter((entry) =>
    entry.label.toLowerCase().includes(search.toLowerCase())
  );

  const pageSize = 5;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("InsightHub report", 10, 10);
    filtered.forEach((row, index) => {
      doc.text(`${row.label}: ${row.value}`, 10, 20 + index * 8);
    });
    doc.save("insighthub-report.pdf");
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "insighthub-report.csv");
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search datasets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button variant="subtle" onClick={handleExportPDF}>
          Export PDF
        </Button>
        <Button variant="outline" onClick={handleExportCSV}>
          Export CSV
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-80">
          <CardHeader title="Growth trajectory" description="Line chart" />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-80">
          <CardHeader title="Channel breakdown" description="Bar chart" />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filtered}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22d3ee" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card className="h-96">
        <CardHeader title="Engagement pie" description="Pie chart" />
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={filtered} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {filtered.map((entry, index) => (
                <Cell
                  key={index}
                  fill={["#6366f1", "#22d3ee", "#f97316", "#a855f7"][index % 4]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <CardHeader title="Heatmap" description="Optional heatmap view using CSS grid" />
        <div className="grid grid-cols-5 gap-3">
          {filtered.slice(0, 15).map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-4 text-center text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, rgba(99,102,241,${
                  item.value / 200
                }), rgba(14,165,233,0.8))`,
              }}
            >
              {item.label}
              <p className="text-xs text-white/80">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Tabular view" description="Filters + pagination" />
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="py-2">Label</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <td className="py-2">{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between pt-4 text-sm">
          <p>
            Page {page} / {Math.ceil(filtered.length / pageSize) || 1}
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, Math.ceil(filtered.length / pageSize) || 1)
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

