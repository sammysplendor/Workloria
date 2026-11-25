"use client";

import { useState } from "react";
import { authClient } from "@/lib/authClient";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links =
    !isPending && session
      ? [
          { href: "/jobs", label: "Browse Jobs" },
          { href: "/jobs/post", label: "Post a Job" },
          { href: "/dashboard", label: "Dashboard" },
        ]
      : !isPending
        ? [{ href: "/jobs", label: "Browse Jobs" }]
        : [];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    toast.success("You have signed out.");
  };

  return (
    <nav className="bg-gray-100 shadow-sm fixed top-0 right-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 relative">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Image
                src="/workloria_logo.png"
                alt="Workloria logo"
                width={50}
                height={50}
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Workloria
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-16">
              <div className="flex items-center gap-4">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <span>
                {!isPending && session ? (
                  <div className="flex items-center gap-4">
                    <Button onClick={handleSignOut} variant="outline">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => router.push("/sign-in")}>
                    Sign In
                  </Button>
                )}
              </span>
            </div>

            <div className="relative md:hidden">
              <button
                type="button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navbar-menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {isMenuOpen && (
                <div
                  id="mobile-navbar-menu"
                  className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-gray-100 p-3 shadow-md"
                >
                  <div className="flex flex-col gap-2">
                    {links.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                      >
                        {label}
                      </Link>
                    ))}
                    {!isPending && session ? (
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        className="w-full"
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <Button
                        onClick={() => router.push("/sign-in")}
                        className="w-full"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
