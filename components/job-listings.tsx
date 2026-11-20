import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
            <CardContent className="flex flex-col gap-2">
              <h2>
                {job.experience} | {job.workplace}
              </h2>
              <CardDescription>{job.description}</CardDescription>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
