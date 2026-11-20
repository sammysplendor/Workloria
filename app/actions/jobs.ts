"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import {
  EmploymentType,
  ExperienceLevel,
  WorkplaceType,
} from "../generated/prisma/enums";

export const createJob = async (data: {
  title: string;
  company: string;
  employmentType: EmploymentType;
  workplaceType: WorkplaceType;
  state: string;
  city?: string;
  jobDescription: string;
  experienceLevel: ExperienceLevel;
  salary?: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "You must be logged in to post a job.",
      };
    }

    const job = await prisma.job.create({
      data: {
        title: data.title,
        company: data.company,
        type: data.employmentType,
        workplace: data.workplaceType,
        state: data.state,
        city: data.city,
        description: data.jobDescription,
        experience: data.experienceLevel,
        salary: data.salary || null,
        postedById: session.user.id,
      },
    });

    return {
      success: true,
      job,
    };
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    return {
      success: false,
      error: "Something went wrong while creating the job.",
    };
  }
};
