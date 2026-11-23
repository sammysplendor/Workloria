"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Controller, useForm } from "react-hook-form";
import { Search } from "lucide-react";
import {
  jobSearchFormInput,
  jobSearchFormSchema,
  jobSearchFormType,
} from "@/utils/form-schemas/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const JobSearchForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<jobSearchFormInput, unknown, jobSearchFormType>({
    resolver: zodResolver(jobSearchFormSchema),
    defaultValues: {
      search: "",
      type: "",
      location: "",
    },
  });

  const onSubmit = async (data: jobSearchFormType) => {
    try {
      const params = new URLSearchParams();

      if (data.search.trim()) {
        params.set("search", data.search.trim());
      }

      if (data.type) {
        params.set("type", data.type);
      }

      if (data.location.trim()) {
        params.set("location", data.location.trim());
      }

      startTransition(() => router.push(`/jobs?${params.toString()}`));
    } catch (error) {
      console.error("JOB SEARCH ERROR:", error);
    }
  };

  return (
    <Card className="w-full mx-auto bg-gray-50 shadow-md flex flex-col gap-4">
      <CardHeader>
        <CardTitle className="font-bold">Find Jobs</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="job-search-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="search"
              control={form.control}
              render={({ field, fieldState }) => (
                <span className="bg-white flex items-center gap-2 px-4 rounded-lg border">
                  <Search size={16} />{" "}
                  <Input
                    {...field}
                    type="text"
                    placeholder="Search jobs..."
                    aria-invalid={fieldState.invalid}
                    className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </span>
              )}
            />

            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="FULL_TIME">Full-time</SelectItem>
                    <SelectItem value="PART_TIME">Part-time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                    <SelectItem value="FREELANCE">Freelance</SelectItem>
                  </SelectContent>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Select>
              )}
            />

            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Location (e.g, Lagos)"
                    aria-invalid={fieldState.invalid}
                    className="bg-white"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </>
              )}
            />
          </div>
        </form>
        <Button
          form="job-search-form"
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white hover:bg-blue-800 mt-6"
        >
          {isPending ? <Spinner className="size-6" /> : "Search"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobSearchForm;
