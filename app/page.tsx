import Hero from "@/components/home/Hero";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="w-full min-h-dvh flex flex-col gap-12 mx-auto px-4 sm:px-6">
      {/* ===== Hero Section ===== */}
      <Hero />

      {/* ===== Featured Jobs Section ===== */}
      <Suspense
        fallback={
          <p className="text-center text-2xl mt-12">Loading Featured Jobs...</p>
        }
      >
        <FeaturedJobs />
      </Suspense>
    </main>
  );
}
