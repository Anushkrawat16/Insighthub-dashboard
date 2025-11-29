"use client";

import { useState } from "react";
import Tabs from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Switch from "@/components/ui/switch";
import ThemeCard from "@/components/settings/theme-card";

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState("general");
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = useState(true);
  const [slackAlertEnabled, setSlackAlertEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
          Workspace Settings
        </p>
        <h1 className="text-3xl font-semibold">
          Control themes, notifications, tokens
        </h1>
      </header>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        tabs={[
          { value: "general", label: "General" },
          { value: "notifications", label: "Notifications" },
          { value: "api", label: "API Access" },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Workspace identity" description="Brand + meta" />
          <div className="space-y-4">
            <Input placeholder="Workspace name" defaultValue="InsightHub HQ" />
            <Input placeholder="Subdomain" defaultValue="hq.insighthub.ai" />
            <Button disabled>Save changes (demo)</Button>
          </div>
        </Card>
        <Card>
          <CardHeader title="Notifications" description="Email + Slack alerts" />
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4 dark:bg-slate-900/40">
              <div>
                <p className="font-semibold">Weekly digest</p>
                <p className="text-sm text-slate-500">
                  Top metrics and anomalies
                </p>
              </div>
              <Switch
                checked={weeklyDigestEnabled}
                onChange={setWeeklyDigestEnabled}
              />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4 dark:bg-slate-900/40">
              <div>
                <p className="font-semibold">Slack alert</p>
                <p className="text-sm text-slate-500">
                  Real-time anomaly ping
                </p>
              </div>
              <Switch
                checked={slackAlertEnabled}
                onChange={setSlackAlertEnabled}
              />
            </div>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader
            title="API Tokens"
            description="Manage OpenAI + InsightHub tokens"
          />
          <div className="space-y-4">
            <Input placeholder="OpenAI API Key" defaultValue="" />
            <Button variant="outline">Rotate token</Button>
            <ThemeCard />
          </div>
        </Card>
      </div>
    </div>
  );
}

