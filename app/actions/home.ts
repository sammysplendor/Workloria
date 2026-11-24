import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

export const featuredJobs = async () => {
  await connection();

  return await prisma.job.findMany({
    orderBy: { postedAt: "desc" },
    take: 2,
    include: {
      _count: {
        select: { applications: true },
      },
    },
  });
};
