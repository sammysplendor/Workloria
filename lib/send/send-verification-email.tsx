import { Resend } from "resend";
import VerificationEmail from "@/components/auth/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailProps {
  to: string;
  verificationUrl: string;
  userName: string;
}

export const sendVerificationEmail = async ({
  to,
  verificationUrl,
  userName,
}: EmailProps) => {
  console.log("Attempting to send verification email to:", to);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM_RESEND!,
    to,
    subject: "Welcome to Workloria.",
    react: (
      <VerificationEmail
        verificationUrl={verificationUrl}
        userName={userName}
      />
    ),
  });

  if (error) {
    console.error("RESEND ERROR:", error);
    throw new Error(error.message);
  }

  console.log("VERIFICATION EMAIL SENT:", data);
};
