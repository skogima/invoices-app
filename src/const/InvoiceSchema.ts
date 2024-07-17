import { z as zod } from "zod";

const addressValidationSchema = zod.object({
  city: zod.string().min(1, { message: "can't be empty" }),
  country: zod.string().min(1, { message: "can't be empty" }),
  postCode: zod.string().min(1, { message: "can't be empty" }),
  street: zod.string().min(1, { message: "can't be empty" }),
});

export const invoiceSchema = zod.object({
  clientEmail: zod
    .string()
    .min(1, { message: "can't be empty" })
    .email({ message: "invalid email" }),
  clientName: zod.string().min(1, { message: "can't be empty" }),
  clientAddress: addressValidationSchema,
  senderAddress: addressValidationSchema,
  createdAt: zod.string().min(1, { message: "can't be empty" }),
  description: zod.string().min(1, { message: "can't be empty" }),
  paymentTerms: zod
    .number()
    .refine((value) => value > 0 && value <= 30)
    .default(30),
  items: zod
    .array(
      zod.object({
        id: zod.string(),
        name: zod.string().min(1),
        price: zod.number().refine((value) => value >= 0),
        quantity: zod.number().refine((value) => value > 0),
        total: zod.number(),
      }),
    )
    .min(1),
});

export type CreateInvoiceSchema = zod.infer<typeof invoiceSchema>;
