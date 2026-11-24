import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredJobs } from "@/app/actions/home";

const FeaturedJobs = async () => {
  const jobs = await featuredJobs();

  return (
    <section className="flex flex-col gap-4 mt-6 items-center sm:items-start bg-gray-100 -mx-auto -mx-4 sm:-mx-6 px-4 sm:px-6 py-8">
      <div className="grid grid-cols-[70%_30%] gap-4 w-full">
        <div>
          <h1>Explore opportunities</h1>
          <p>
            Find opportunities that match your skills, interests, and career
            goals.
          </p>
        </div>
        <Link href="/jobs" className="flex items-center gap-2 justify-end">
          View all jobs <ArrowUpRight size={16} className="shrink-0" />
        </Link>
      </div>

      <div className="grid grid-col-2 gap-4 w-full"></div>
    </section>
  );
};

export default FeaturedJobs;
