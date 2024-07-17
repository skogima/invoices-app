import { generateHexId, round } from "@/utils";
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

function calcPaymentDue(createdAt: Date, paymentTerms: number) {
  const paymentDue = new Date(createdAt);
  paymentDue.setDate(paymentTerms + createdAt.getDate());
  return paymentDue;
}

function calcInvoiceTotal(products: Product[]) {
  return round(products.reduce((total, item) => total + item.total, 0));
}

export function createInvoice(invoice: Omit<Invoice, "id" | "total" | "paymentDue">): Invoice {
  return {
    ...invoice,
    id: generateHexId(),
    paymentDue: calcPaymentDue(new Date(invoice.createdAt), invoice.paymentTerms).toISOString(),
    total: calcInvoiceTotal(invoice.items),
  };
}
