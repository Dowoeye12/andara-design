import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  organization: z.string().trim().min(2, "Organization must be at least 2 characters").max(100, "Organization must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  role: z.enum(["Operator", "Lessor", "Financier", "Advisor", "Other"], {
    required_error: "Please select a role",
  }),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  honeypot: z.string().max(0, "Invalid submission"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
