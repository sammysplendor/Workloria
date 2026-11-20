import { Inbox } from "lucide-react";
import Link from "next/link";

const VerifyEmailPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mb-6 text-5xl">
          <Inbox width={6} height={6} />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-slate-900">
          Check your email
        </h1>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          We have sent you a verification link. Please check your inbox and
          click the link to verify your email address and activate your
          Workloria account.
        </p>

        <p className="mb-6 text-sm text-slate-500">
          Cannot find the email? Check your spam or junk folder.
        </p>

        <Link
          href="/sign-in"
          className="inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold border bg-gray-100 text-slate-900 transition hover:bg-blue-700 hover:text-white"
        >
          Go to Sign In
        </Link>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
