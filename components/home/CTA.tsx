"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-8 mt-6 items-center bg-blue-50 px-4 sm:px-6 py-24">
      <div className="text-center">
        <h1>Looking for the right talent?</h1>
        <p>
          Reach potential candidates, share your opportunities, and find the
          people who will help your business grow.
        </p>
      </div>

      <div className="flex justify-center items-center">
        <Button
          className="bg-blue-600 hover:bg-blue-800 w-full sm:w-3xl"
          onClick={() => router.push("/jobs/post")}
        >
          Post a Job <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </section>
  );
};

export default CTA;
