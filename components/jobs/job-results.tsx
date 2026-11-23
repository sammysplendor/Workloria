import { searchJobs } from "@/app/actions/job-search";
import JobListings from "./job-listings";
import { connection } from "next/server";

type JobResultsProps = {
  searchParams: Promise<{
    search?: string;
    type?: string;
    location?: string;
  }>;
};

const JobResults = async ({ searchParams }: JobResultsProps) => {
  await connection();

  const params = await searchParams;

  const result = await searchJobs(params);

  if (!result.success) {
    return <p>Unable to load jobs. Please try again.</p>;
  }

  const jobs = (result.jobs ?? []).map((job) => ({
    ...job,
    city: job.city ?? "",
    state: job.state ?? "",
    salary: job.salary ?? undefined,
  }));

  return <JobListings jobs={jobs} />;
};

export default JobResults;
