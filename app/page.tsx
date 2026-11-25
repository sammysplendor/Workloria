import Hero from "@/components/home/Hero";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import { Suspense } from "react";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export default async function Home() {
  return (
    <main className="w-full min-h-dvh flex flex-col gap-12 sm:gap-16 mx-auto pt-8">
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

      {/* ===== How It Works Section ===== */}
      <HowItWorks />

      {/* ===== CTA Section ===== */}
      <CTA />

      {/* ===== Footer ===== */}
      <Footer />
    </main>
  );
}
