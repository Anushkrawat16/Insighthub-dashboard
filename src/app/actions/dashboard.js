"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getDashboardData() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      widgets: {
        orderBy: { orderIndex: "asc" },
      },
      activities: {
        take: 6,
        orderBy: { createdAt: "desc" },
      },
      uploads: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  return {
    user,
    metrics: {
      users: 12450,
      traffic: 1.2,
      conversions: 4.8,
      revenue: 42000,
    },
  };
}

export async function createWidget(type) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  const count = await prisma.widgetConfig.count({
    where: { ownerId: user.id },
  });

  const widget = await prisma.widgetConfig.create({
    data: {
      type,
      ownerId: user.id,
      orderIndex: count + 1,
      settings: {},
    },
  });

  await logActivity("Widget added", { type });

  return widget;
}

export async function removeWidget(id) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await prisma.widgetConfig.delete({
    where: { id },
  });

  await logActivity("Widget removed", { id });
}

export async function logActivity(action, context) {
  const session = await auth();
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  await prisma.activityLog.create({
    data: {
      action,
      context,
      ownerId: user.id,
    },
  });
}

