import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { connection } from "next/server";
import { Suspense } from "react";

const CopyrightSection = async () => {
  await connection();

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-between items-center text-sm w-full">
      <p>&copy; {currentYear} Workloria</p>
      <p>Official platform</p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative left-1/2 -translate-x-1/2 w-screen bg-gray-100 py-8 mt-6">
      <div className="flex flex-col gap-2 items-start px-4 sm:px-8 w-full mx-auto max-w-7xl">
        <div className="grid sm:grid-cols-[60%_40%] gap-6 items-start w-full">
          <div className="flex flex-col gap-2">
            <span className="text-3xl sm:text-5xl font-bold flex items-center gap-2">
              <Image
                src={"/workloria_logo.png"}
                alt="Workloria logo"
                width={128}
                height={128}
                className="w-12 h-12 sm:w-32 sm:h-32 object-contain"
              />
              Workloria
            </span>
            <p>
              Find opportunity. <br />
              Build ypur future.
            </p>
          </div>

          <div className="flex flex-col items-start gap-8 pt-6">
            <h3>Quick links</h3>
            <Link href="/jobs" className="text-slate-500 hover:text-blue-600">
              Explore
            </Link>
            <Link
              href="/jobs/post"
              className="text-slate-500 hover:text-blue-600"
            >
              Post a Job
            </Link>
            <Link
              href="/sign-in"
              className="text-slate-500 hover:text-blue-600"
            >
              Sign In
            </Link>
          </div>
        </div>

        <Separator />

        <Suspense
          fallback={<p className="text-center">Loading current year...</p>}
        >
          <CopyrightSection />
        </Suspense>
      </div>
    </footer>
  );
};

export default Footer;
