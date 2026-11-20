import z from "zod";

export const jobPostFormSchema = z.object({
  // Basic information
  title: z.string().min(3, "Please enter a valid job title"),
  company: z.string().min(2, "Please enter a valid comapny name"),
  employmentType: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"])
    .or(z.literal(""))
    .refine((value) => value !== "", {
      message: "Please select an employment type",
    }),
  workplaceType: z
    .enum(["ON_SITE", "REMOTE", "HYBRID"])
    .or(z.literal(""))
    .refine((value) => value !== "", {
      message: "Please select a workplace type",
    }),

  // Location
  state: z.string(),
  city: z.string().optional(),

  //Job description
  jobDescription: z
    .string()
    .min(50, "Job description must be at least 50 characters"),

  // Experience
  experienceLevel: z
    .enum(["ENTRY_LEVEL", "JUNIOR", "MID_LEVEL", "SENIOR", "LEAD", "EXECUTIVE"])
    .or(z.literal(""))
    .refine((value) => value !== "", {
      message: "Please select an experience level",
    }),

  // Compensation
  salary: z.string().optional(),
});

// export type jobPostFormType = z.infer<typeof jobPostFormSchema>;

export type jobPostFormInput = z.input<typeof jobPostFormSchema>;

export type jobPostFormType = z.output<typeof jobPostFormSchema>;
