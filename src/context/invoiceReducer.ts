import type { Invoice } from "@/domain";

export type InvoiceAction =
  | { type: "set"; payload: Invoice[] }
  | { type: "add"; payload: Invoice }
  | { type: "update"; payload: Invoice }
  | { type: "delete"; payload: Invoice };

export function invoicesReducer(invoices: Invoice[], { type, payload }: InvoiceAction): Invoice[] {
  switch (type) {
    case "set":
      return payload;
    case "add":
      return [...invoices, payload];
    case "delete":
      return invoices.filter((invoice) => invoice.id !== payload.id);
    case "update":
      return invoices.map((invoice) => {
        if (invoice.id == payload.id) {
          return payload;
        }

        return invoice;
      });
    default:
      return invoices;
  }
}
