"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const signInFormSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Please enter a valid password"),
});

type formType = z.infer<typeof signInFormSchema>;

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<formType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: formType) => {
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            toast.success("Signed in successfully!");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error("EMAIL SIGN IN ERROR:", error);
    }
  };

  const SignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Card className="w-full sm:max-w-md shadow-md bg-gray-100">
      <CardHeader className="text-center">
        <CardTitle className="font-bold">Sign in to Workloria</CardTitle>
        <CardDescription>
          Access your account to post jobs or apply for opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="sign-in form">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="email"
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
                    {...field}
                    type="password"
                    id="password"
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

          <Button type="submit" className="mt-6 w-full" form="sign-in form">
            {form.formState.isSubmitting ? (
              <Spinner className="size-6" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className=" text-sm flex items-center gap-1.5 mt-2">
          Do not have an account?
          <Link href="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </CardContent>

      <div className="flex flex-col gap-2 items-center w-full">
        <p className="text-sm">Or</p>
        <Separator />
      </div>

      <div className="px-6">
        <Button variant="outline" className="w-full" onClick={SignInWithGoogle}>
          <FcGoogle className="size-6" /> Continue with Google
        </Button>
      </div>
    </Card>
  );
};

export default SignInForm;
