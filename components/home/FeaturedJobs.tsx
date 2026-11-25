import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredJobs } from "@/app/actions/home";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const FeaturedJobs = async () => {
  const jobs = await featuredJobs();

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen bg-gray-100 py-8 mt-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-4 items-center sm:items-start">
        <div className="grid grid-cols-[60%_40%] sm:grid-cols-[80%_20%] gap-4 w-full">
          <div>
            <h1>Explore opportunities</h1>
            <p>
              Find opportunities that match your skills, interests, and career
              goals.
            </p>
          </div>
          <Link
            href="/jobs"
            className="flex items-center gap-2 justify-end hover:text-blue-600"
          >
            View all jobs <ArrowUpRight size={16} className="shrink-0" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {jobs.map((job) => (
            <div key={job.id} className="mb-4">
              <Card className="w-full shadow-md bg-white">
                <CardHeader className="">
                  <CardTitle className="font-bold flex justify-between">
                    <span>{job.title}</span> <span>{job.salary}</span>
                  </CardTitle>
                  <p>{job.company}</p>
                  <small>
                    {job.city}, {job.state}
                  </small>
                </CardHeader>
                <CardContent className="flex justify-between items-center gap-2">
                  <h2>
                    {job.experience} | {job.workplace}
                  </h2>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
