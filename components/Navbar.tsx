"use client";

import { authClient } from "@/lib/authClient";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    toast.success("You have signed out.");
  };

  return (
    <nav className="bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Workloria logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Workloria
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-16">
            {!isPending && session ? (
              <div className="flex items-center gap-4">
                <Link
                  href={"/jobs"}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Browse Jobs
                </Link>
                <Link
                  href={"/jobs/post"}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Post a Job
                </Link>
                <Link
                  href={"/dashboard"}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
              </div>
            ) : !isPending ? (
              <div className="flex items-center gap-4">
                <Link
                  href={"/jobs"}
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : null}

            <span>
              {!isPending && session ? (
                <div className="flex items-center gap-4">
                  <Button onClick={handleSignOut} variant="outline">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
              )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
