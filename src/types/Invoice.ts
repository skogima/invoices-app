import type { Product } from "./Product";

export type InvoiceStatus = "paid" | "pending" | "draft";

export type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type Invoice = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: Product[];
  total: number;
};
