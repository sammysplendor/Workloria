"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export const dashboardStats = async () => {
  await connection();
  // Get the loged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Protect the dashboard
  if (!session) {
    redirect("/sign-in");
  }

  const userId = session?.user?.id;

  // Fetch dashboard statistics
  const [recentJobs, totalApplications, totalJobs] = await Promise.all([
    prisma.job.findMany({
      where: {
        postedById: userId,
      },
      orderBy: {
        postedAt: "desc",
      },
      take: 5,
      include: {
        _count: {
          select: { applications: true },
        },
      },
    }),

    prisma.application.count({
      where: {
        job: { postedById: userId },
      },
    }),

    prisma.job.count({
      where: { postedById: userId },
    }),
  ]);

  return { recentJobs, totalApplications, totalJobs };
};
