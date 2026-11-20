import JobSearchForm from "@/components/Job-search-form";
import { Suspense } from "react";
import JobResults from "@/components/job-results";

type JobsPageProps = {
  searchParams: Promise<{
    search?: string;
    type?: string;
    location?: string;
  }>;
};

const JobsPage = ({ searchParams }: JobsPageProps) => {
  return (
    <main className="w-full min-h-dvh px-6 sm:px-10 pt-8 flex flex-col gap-4">
      <JobSearchForm />

      <Suspense
        fallback={<p className="text-center text-2xl mt-12">Loading jobs...</p>}
      >
        <JobResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default JobsPage;
