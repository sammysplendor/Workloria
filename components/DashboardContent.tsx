import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  Plus,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  Building2,
} from "lucide-react";
import { dashboardStats } from "@/app/actions/dashboard";

const DashboardContent = async () => {
  const { recentJobs, totalApplications } = await dashboardStats();

  function formatEmploymentType(type: string): import("react").ReactNode {
    return type
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your job postings and track applications.
          </p>
        </div>

        <Link
          href="/jobs/post"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Post a Job
        </Link>
      </div>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title} className="border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <div className="rounded-lg bg-blue-50 p-2">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })} */}
      </section>

      {/* Recent Job Postings */}
      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">
                Recent Job Postings
              </CardTitle>
              <CardDescription className="mt-1">
                Keep track of the jobs you have published.
              </CardDescription>
            </div>

            <Link
              href="/dashboard/jobs"
              className="hidden items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 sm:flex"
            >
              View all
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Employment</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {recentJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">
                            {job.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {job.company}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {[job.city, job.state].filter(Boolean).join(", ")}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {formatEmploymentType(job.type)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <span className="font-medium text-slate-700">
                          {job._count.applications}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {job.postedAt.toLocaleDateString()}
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">View {job.title}</span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex justify-center sm:hidden">
              <Link
                href="/dashboard/jobs"
                className="flex w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                View all jobs
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-slate-200 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-2.5">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">Post a new job</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Find the right candidates for your team.
                  </p>
                </div>
              </div>

              <Link
                href="/jobs/post"
                title="Post a new job"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-2.5">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">
                    Explore opportunities
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Discover jobs posted by other employers.
                  </p>
                </div>
              </div>

              <Link
                href="/jobs"
                title="Explore opportunities"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DashboardContent;
