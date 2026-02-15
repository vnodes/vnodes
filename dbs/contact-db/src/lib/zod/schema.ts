import z from 'zod';

export const ContactTypeSchema = z.enum(['CUSTOMER', 'EMPLOYEE', 'OTHER']);

export const UserCreateInputSchema = z.object({
    salary: z.number().max(16000),
    attributes: z.record(z.string(), z.any()).optional(),
});

export const AddressCreateInputSchema = z.object({
    street: z.string().max(255).min(3),
    city: z.string().max(255),
    state: z.string().max(255),
    country: z.string().max(255),
    zip: z.string().max(30),
    contactId: z.int(),
});

export const EmailCreateInputSchema = z.object({
    value: z.string(),
    contactId: z.int(),
});

export const PhoneCreateInputSchema = z.object({
    value: z.string(),
    contactId: z.int(),
});

export const ContactCreateInputSchema = z.object({
    type: ContactTypeSchema,
    userId: z.int(),
});
