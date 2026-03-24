import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  phone: z.string().min(10, "Phone number should be at least 10 digits"),

  gender: z.enum(["male", "female", "other"], {
    error: "Please select a gender",
  }),
  dob: z.any().refine((val) => val && val.isValid?.(), {
    message: "Please select a valid date of birth",
  }),
  bio: z.string().min(10, "Bio should be at least 10 characters"),

  degrees: z
    .array(
      z.object({
        degree: z.string().min(2, "Degree name too short"),
        college: z.string().min(2, "College name too short"),
        year: z.string().regex(/^\d{4}$/, "Enter a valid year (e.g. 2023)"),
      })
    )
    .min(1, "Add at least one degree"),

  skills: z.array(z.string()).min(1, "Select at least one skill"),

  relocate: z.enum(["yes", "no"], {
    error: "Please select relocation preference",
  }),
  location: z.string().optional(),
  expectedSalary: z.string().min(1, "Enter expected salary"),
});

export type FormValues = z.infer<typeof formSchema>;

export const STEP_FIELDS: (keyof FormValues)[][] = [
  ["name", "email", "password", "phone"],
  ["gender", "dob", "bio"],
  ["degrees"],
  ["skills", "relocate", "location", "expectedSalary"],
  [],
];

export const STEPS = ["Basic Info", "Personal", "Education", "Preferences", "Review"];