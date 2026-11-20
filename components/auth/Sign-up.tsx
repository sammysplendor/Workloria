"use client";

import z from "zod";
import { authClient } from "@/lib/authClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "../ui/separator";

const signUpFormSchema = z.object({
  name: z
    .string()
    .trim()
    .refine(
      (val) => {
        const parts = val.trim().split(/\s+/);
        return parts.length >= 2 && parts.every((part) => part.length >= 2);
      },
      {
        message: "Enter both first and last name (at least 2 characters each).",
      },
    ),
  email: z.email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Must be atleast 6 characters")
    .regex(
      /^[a-zA-Z0-9]/,
      "Must contain atleast a number and 1 special character",
    ),
});

type formType = z.infer<typeof signUpFormSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<formType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: formType) => {
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: async () => {
            router.push("/verify-email");
            toast.success("Account created! Please check your email.");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error("EMAIL SIGN UP ERROR:", error);
    }
  };

  const SignUpWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Card className="w-full sm:max-w-md shadow-md bg-gray-100">
      <CardHeader className="text-center">
        <CardTitle className="font-bold">Create your account</CardTitle>
        <CardDescription>Join Workloria and get started today.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="sign-up form">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    autoComplete="off"
                    className="bg-gray-50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    type="email"
                    id="email"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email address"
                    autoComplete="off"
                    className="bg-gray-50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    type="password"
                    id="password"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    className="bg-gray-50"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" form="sign-up form" className="w-full mt-6">
            {form.formState.isSubmitting ? (
              <Spinner className="size-6" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className=" text-sm flex items-center gap-1.5 mt-2">
          Already have an account?
          <Link href="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </p>

        <div className="flex flex-col gap-2 items-center w-full">
          <p className="text-sm">Or</p>
          <Separator />
        </div>

        <div className="px-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={SignUpWithGoogle}
          >
            <FcGoogle className="size-6" /> Continue with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
