import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import ApplyButton from "@/components/ApplyButton";

const JobDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <div className="flex flex-col gap-16">
      <div className="relative">
        <Link
          href="/jobs"
          className="absolute top-4 left-4 p-2 rounded-xl hover hover:bg-gray-100 text-sm flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} /> Back to jobs
        </Link>
      </div>

      <Suspense
        fallback={<p className="text-center text-2xl mt-12">Loading job...</p>}
      >
        <JobDetail params={params} />
      </Suspense>
    </div>
  );
};

const JobDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  await connection();

  const { id: jobId } = await params;

  const jobDetail = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!jobDetail) {
    notFound();
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="">
        <CardTitle className="font-bold flex justify-between">
          <span>{jobDetail.title}</span> <span>{jobDetail.salary}</span>
        </CardTitle>
        <p>{jobDetail.company}</p>
        <small>
          {jobDetail.city}, {jobDetail.state}
        </small>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <h2>
          {jobDetail.experience} | {jobDetail.workplace}
        </h2>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>{jobDetail.description}</CardDescription>
      </CardContent>

      <CardFooter>
        <ApplyButton jobId={jobId} />
      </CardFooter>
    </Card>
  );
};

export default JobDetailPage;
