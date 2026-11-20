"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  jobPostFormInput,
  jobPostFormSchema,
  jobPostFormType,
} from "@/utils/form-schemas/jobPost";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { createJob } from "@/app/actions/jobs";
import { toast } from "sonner";

const JobPostPage = () => {
  const router = useRouter();

  const form = useForm<jobPostFormInput, unknown, jobPostFormType>({
    resolver: zodResolver(jobPostFormSchema),
    defaultValues: {
      title: "",
      company: "",
      employmentType: "",
      workplaceType: "",
      state: "",
      city: "",
      jobDescription: "",
      experienceLevel: "",
      salary: "",
    },
  });

  const onSubmit = async (data: jobPostFormType) => {
    try {
      const result = await createJob(data);

      console.log("SERVER ACTION RESPONSE:", result);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Job created successfully!");

      form.reset();
      router.push("/dashboard");
    } catch (error) {
      console.error("JOB POST ERROR:", error);
    }
  };

  return (
    <main className="relative w-full min-h-dvh flex flex-col justify-center items-center mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        href="/dashboard"
        className="absolute top-4 left-4 p-2 rounded-xl hover hover:bg-gray-100 text-sm flex items-center justify-center gap-2"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="w-full max-w-2xl flex flex-col items-center gap-2 px-10 mt-8">
        <Card className="w-full bg-gray-100 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="font-bold text-xl">Post a job</CardTitle>
            <CardDescription>
              Find the right people for your team.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="job-post-form" onSubmit={form.handleSubmit(onSubmit)}>
              <CardTitle className="mb-2">BASIC INFORMATION</CardTitle>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">Job title</FieldLabel>
                      <Input
                        type="text"
                        id="title"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Senior Product Designer"
                        autoComplete="on"
                        className="bg-gray-50"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="company"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="company">Company name</FieldLabel>
                      <Input
                        type="text"
                        id="company"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Workloria Technologies"
                        autoComplete="on"
                        className="bg-gray-50"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="employmentType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? null}
                    >
                      <FieldLabel htmlFor="employmentType">
                        Employment type
                      </FieldLabel>

                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
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
                  name="workplaceType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? null}
                    >
                      <FieldLabel htmlFor="workplaceType">
                        Workplace type
                      </FieldLabel>

                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select workplace type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ON_SITE">On-site</SelectItem>
                        <SelectItem value="REMOTE">Remote</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                      </SelectContent>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Select>
                  )}
                />
              </FieldGroup>

              <CardTitle className="mb-2 mt-6">JOB LOCATION</CardTitle>
              <FieldGroup>
                <Controller
                  name="state"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="state">State</FieldLabel>
                      <Input
                        type="text"
                        id="state"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Lagos"
                        autoComplete="on"
                        className="bg-gray-50"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="city">City</FieldLabel>
                      <Input
                        type="text"
                        id="city"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Ikeja"
                        autoComplete="on"
                        className="bg-gray-50"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <CardTitle className="mb-2 mt-6">JOB DESCRIPTION</CardTitle>
              <FieldGroup>
                <Controller
                  name="jobDescription"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="jobDescription">
                        Job description
                      </FieldLabel>
                      <Textarea
                        id="jobDescription"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Describe the role, its purpose, and what the successful candidate will be responsible for..."
                        className="bg-gray-50"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <CardTitle className="mb-2 mt-6">EXPERIENCE</CardTitle>
              <FieldGroup>
                <Controller
                  name="experienceLevel"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? null}
                    >
                      <FieldLabel htmlFor="experienceLevel">
                        Experience level
                      </FieldLabel>

                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ENTRY_LEVEL">Entry level</SelectItem>
                        <SelectItem value="JUNIOR">Junior</SelectItem>
                        <SelectItem value="MID_LEVEL">Mid level</SelectItem>
                        <SelectItem value="SENIOR">Senior</SelectItem>
                        <SelectItem value="LEAD">Lead</SelectItem>
                        <SelectItem value="EXECUTIVE">Executive</SelectItem>
                      </SelectContent>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Select>
                  )}
                />
              </FieldGroup>

              <CardTitle className="mb-2 mt-6">COMPENSATION</CardTitle>
              <FieldGroup>
                <Controller
                  name="salary"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="salary">
                        Salary{" "}
                        <span className="ml-1 text-muted-foreground">
                          (Optional)
                        </span>
                      </FieldLabel>
                      <Input
                        type="text"
                        id="salary"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. ₦200,000 - ₦350,000 monthly"
                        className="bg-gray-50"
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter the salary or salary range you want applicants to
                        see.
                      </p>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>

            <Button
              type="submit"
              form="job-post-form"
              className="w-full bg-blue-600 text-white hover:bg-blue-800 mt-6"
            >
              {form.formState.isSubmitting ? (
                <Spinner className="size-6" />
              ) : (
                "Post Job"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default JobPostPage;
