import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full flex flex-col gap-4 mt-6 items-center sm:items-start px-4 sm:px-8 py-8">
      <span className="text-sm text-slate-400 font-medium py-4">
        YOUR CAREER JOURNEY BEGINS HERE
      </span>

      <div className="flex flex-col gap-4 sm:grid grid-cols-2 sm:gap-4">
        <div className="flex flex-col gap-6 justify-between items-center sm:items-start py-6">
          <h1 className="text-4xl sm:text-6xl text-center sm:text-left">
            Your next <span className="text-blue-600">opportunity</span> starts
            here.
          </h1>
          <p className="text-center sm:text-left">
            Discover exciting opportunities, connect with employers, and take
            the next step in your career. Finding the right job just got
            simpler.
          </p>
          <div className="flex flex-col w-full sm:flex-row gap-4 items-center justify-start sm:w-fit">
            <Link
              href="/jobs"
              className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm text-white font-medium transition-colors bg-blue-600 hover:bg-blue-800 w-full sm:w-fit"
            >
              Explore Jobs
            </Link>
            <Link
              href="/jobs/post"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground w-full sm:w-fit"
            >
              Post a Job
            </Link>
          </div>
        </div>

        <div className="w-full p-4 flex items-center justify-center">
          <Image
            src="/hero_image.svg"
            alt="Hero image"
            width={400}
            height={400}
            className="w-48 sm:w-64 md:w-80 lg:w-100 h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
