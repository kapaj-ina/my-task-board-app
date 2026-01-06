import { z } from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please give your task a name")
    .max(100, "Task name must be under 100 characters"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .transform((value) => (value === "" ? null : value))
    .optional(),
  icon: z
    .string()
    .transform((value) => (value === "" ? null : value))
    .optional(),
  status: z
    .string()
    .transform((value) => (value === "" ? null : value))
    .optional(),
});
