// src/lib/validation.ts
import { z } from 'zod';

export const AddPatientSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    problem: z.string().min(1, { message: "Problem/Symptoms are required." }),
    priority: z.enum(['Normal', 'Emergency']),
});

export type AddPatientFormValues = z.infer<typeof AddPatientSchema>;