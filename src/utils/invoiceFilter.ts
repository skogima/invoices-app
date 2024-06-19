import { Invoice, InvoiceStatus } from "@/types";

export function getFilteredInvoices(invoices: Invoice[], status: InvoiceStatus | null) {
  return status ? invoices.filter((invoice) => invoice.status == status) : invoices;
}
