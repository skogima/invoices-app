import type { Invoice, InvoiceStatus } from "@/domain";

function getMessageWithStatus(
  invoices: Invoice[],
  status: InvoiceStatus | null,
  mode: "full" | "short",
) {
  if (mode == "full") {
    return invoices.length == 1
      ? `There is 1 ${status} invoice`
      : `There are ${invoices.length} ${status} invoices`;
  }

  return invoices.length == 1 ? `1 ${status} invoice` : `${invoices.length} ${status} invoices`;
}

function getMessageWithoutStatus(invoices: Invoice[], mode: "full" | "short") {
  if (mode == "full") {
    return invoices.length == 1
      ? `There is 1 invoice`
      : `There are ${invoices.length} total invoices`;
  }

  return invoices.length == 1 ? "1 invoice" : `${invoices.length} invoices`;
}

export function getInvoiceLengthMessage(
  invoices: Invoice[],
  status: InvoiceStatus | null,
  mode: "full" | "short",
) {
  if (!invoices.length) {
    return !status ? `No ${status} invoices` : "No invoices";
  }

  if (!status) {
    return getMessageWithoutStatus(invoices, mode);
  }

  return getMessageWithStatus(invoices, status, mode);
}
