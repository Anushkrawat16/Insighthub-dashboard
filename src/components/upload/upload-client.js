"use client";

import { useState, useTransition } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { processUpload } from "@/app/actions/upload";
import Tabs from "@/components/ui/tabs";

export default function UploadClient({ uploads }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(uploads[0]?.preview ?? []);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || file.name);
    startTransition(async () => {
      const upload = await processUpload(formData);
      setPreview(upload.preview);
    });
  };

  const filtered = preview?.filter((row) => {
    if (filter === "all") return true;
    if (filter === "high") return (row.value ?? 0) > 100;
    if (filter === "low") return (row.value ?? 0) <= 100;
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Upload Dataset" description="Supports CSV / Excel. Data is parsed on the server with server actions." />
        <div className="space-y-4">
          <Input
            placeholder="Marketing Performance Q4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <Button onClick={handleSubmit} disabled={isPending || !file}>
            {isPending ? "Processing..." : "Upload and parse"}
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader title="Preview" description="First rows stored in `UploadedData.preview`" />
        <Tabs
          value={filter}
          onChange={setFilter}
          tabs={[
            { value: "all", label: "All" },
            { value: "high", label: "Value > 100" },
            { value: "low", label: "Value <= 100" },
          ]}
        />
        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                {filtered?.length
                  ? Object.keys(filtered[0]).map((key) => <th key={key} className="py-2">{key}</th>)
                  : null}
              </tr>
            </thead>
            <tbody>
              {filtered?.map((row, index) => (
                <tr key={index} className="border-t border-white/10">
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key} className="py-2 text-xs text-slate-600 dark:text-slate-200">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
              {!filtered?.length ? (
                <tr>
                  <td className="py-4 text-center text-sm text-slate-500" colSpan={4}>
                    No preview available yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

