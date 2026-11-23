"use client";

import { applyJob } from "@/app/actions/apply-job";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type ApplyButtonProps = {
  jobId: string;
  hasApplied?: boolean;
};

const ApplyButton = ({ jobId, hasApplied = false }: ApplyButtonProps) => {
  const [applied, setApplied] = useState(hasApplied);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleApply = () => {
    startTransition(async () => {
      try {
        const result = await applyJob(jobId);

        if (!result.success) {
          switch (result.message) {
            case "UNAUTHENTICATED":
              toast.error("Please sign in to apply for this job.");
              router.push("/sign-in");
              return;

            case "ALREADY_APPLIED":
              setApplied(true);
              toast.info("You have already applied for this job.");
              return;

            case "JOB_NOT_FOUND":
              toast.error("This job is no longer available.");
              return;

            default:
              toast.error("Unable to submit your application.");
              return;
          }
        }

        setApplied(true);
        toast.success("Your application was submitted successfully!");

        router.refresh();
      } catch (error) {
        console.error("JOB APPLICATION ERROR:", error);

        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <Button
      onClick={handleApply}
      disabled={isPending || applied}
      className="w-full bg-blue-600 text-white hover:bg-blue-800 mt-6"
    >
      {isPending ? "Applying..." : applied ? "Applied" : "Apply"}
    </Button>
  );
};

export default ApplyButton;
