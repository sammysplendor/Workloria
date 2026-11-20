import z from "zod";

export const jobSearchFormSchema = z.object({
  search: z.string().min(3, "Enter a job title"),
  type: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"])
    .or(z.literal(""))
    .refine((value) => value !== ""),
  location: z.string(),
});

export type jobSearchFormType = z.infer<typeof jobSearchFormSchema>;

export type jobSearchFormInput = z.input<typeof jobSearchFormSchema>;
