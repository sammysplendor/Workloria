"use server";

import { prisma } from "@/lib/prisma";

type JobSearchParams = {
  search?: string;
  type?: string;
  location?: string;
};

export async function searchJobs(params: JobSearchParams) {
  try {
    const { search, type, location } = params;

    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          // Keyword search
          search
            ? {
                OR: [
                  {
                    title: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},

          // Employment type filter
          type && type !== "ALL" ? { type: type as never } : {},

          // Location filter
          location
            ? {
                OR: [
                  {
                    state: {
                      contains: location,
                      mode: "insensitive",
                    },
                  },
                  {
                    city: {
                      contains: location,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
        ],
      },

      orderBy: {
        postedAt: "desc",
      },
    });

    return {
      success: true,
      jobs,
    };
  } catch (error) {
    console.error("SEARCH JOBS ERROR:", error);

    return {
      success: false,
      message: "Unable to search jobs.",
    };
  }
}
