import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Preview,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  userName?: string;
  verificationUrl: string;
}

const VerificationEmail = ({
  userName = "there",
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html lang="en">
      <Head />

      <Preview>
        Verify your email address to get started with Workloria.
      </Preview>

      <Tailwind>
        <Body className="bg-slate-100 font-sans py-10">
          <Container className="mx-auto max-w-xl rounded-xl bg-white px-8 py-10">
            {/* Logo */}
            <Section className="mb-8">
              <Text className="m-0 text-2xl font-bold tracking-tight text-blue-600">
                Workloria
              </Text>
            </Section>

            <Hr className="border-slate-200" />

            {/* Main content */}
            <Section className="py-6">
              <Heading className="mb-4 text-2xl font-bold text-slate-900">
                Verify your email address
              </Heading>

              <Text className="text-base leading-7 text-slate-600">
                Hi {userName},
              </Text>

              <Text className="text-base leading-7 text-slate-600">
                Welcome to Workloria! We are excited to have you on board.
                Before you get started, we just need to verify your email
                address to make sure it is really yours.
              </Text>

              <Text className="text-base leading-7 text-slate-600">
                Click the button below to verify your email address.
              </Text>

              {/* Verification button */}
              <Section className="my-8 text-center">
                <Button
                  href={verificationUrl}
                  className="rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white no-underline"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-sm leading-6 text-slate-500">
                If the button does not work, copy and paste this link into your
                browser:
              </Text>

              <Text className="break-all text-sm text-blue-600">
                {verificationUrl}
              </Text>
            </Section>

            <Hr className="border-slate-200" />

            {/* Security notice */}
            <Section className="pt-5">
              <Text className="text-sm leading-6 text-slate-500">
                If you did not create a Workloria account, you can safely ignore
                this email. No action is required.
              </Text>

              <Text className="mt-6 text-sm text-slate-500">
                Thanks,
                <br />
                The Workloria Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center">
              <Text className="text-xs text-slate-400">
                © {new Date().getFullYear()} Workloria. All rights reserved.
              </Text>

              <Text className="text-xs text-slate-400">
                Connecting talent with opportunities.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
