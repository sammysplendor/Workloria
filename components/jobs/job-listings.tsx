import { ArrowRight } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

type Job = {
  id: string | number;
  title: string;
  company: string;
  city: string;
  state: string;
  type: string;
  description: string;
  experience: string;
  workplace: string;
  salary?: string;
};

type jobListingsProps = {
  jobs: Job[];
};

const JobListings = ({ jobs }: jobListingsProps) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1>No jobs found</h1>
        <p>Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="mb-4">
          <Card className="w-full shadow-md">
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
              <CardAction className="text-blue-700">
                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center gap-2 transition-transform duration-200 hover:translate-x-1"
                >
                  View detail <ArrowRight size={18} />
                </Link>
              </CardAction>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
