"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const applyJob = async (jobId: string) => {
  try {
    // Get session of logged-in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "UNAUTHENTICATED USER",
      };
    }

    const userId = session?.user.id;

    // Check if user has applied for the job
    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId,
        },
      },
    });

    if (existingApplication) {
      return {
        success: false,
        message: "ALREADY_APPLIED",
      };
    }

    // If user haven't applied, create application
    await prisma.application.create({
      data: { jobId, userId },
    });

    return {
      success: true,
      message: "APPLICATION_SUCCESSFUL",
    };
  } catch (error) {
    // Handle duplicate application attempts
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "ALREADY_APPLIED",
      };
    }

    console.error("JOB APPLICATION ERROR:", error);

    return {
      success: false,
      message: "APPLICATION_FAILED",
    };
  }
};
