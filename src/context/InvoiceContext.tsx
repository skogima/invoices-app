/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import { Invoice, InvoiceStatus } from "@/types";
import { useLocalStorage } from "@/hooks";
import data from "@/const/data.json";

export type InvoiceAction =
  | { type: "set"; payload: Invoice[] }
  | { type: "add"; payload: Invoice }
  | { type: "update"; payload: Invoice }
  | { type: "delete"; payload: Invoice };

type InvoiceStore = {
  invoices: Invoice[];
  dispatch: React.Dispatch<InvoiceAction>;
  statusFilter: InvoiceStatus | null;
  setStatusFilter: (value: InvoiceStatus | null) => void;
  invoiceToEdit: Invoice | null;
  setInvoiceToEdit: (value: Invoice | null) => void;
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
};

const InvoiceContext = createContext<InvoiceStore>({} as InvoiceStore);

function invoicesReducer(invoices: Invoice[], { type, payload }: InvoiceAction): Invoice[] {
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

export function useInvoices() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }: PropsWithChildren<object>) {
  const { readValue, store } = useLocalStorage<Invoice[] | null>("invoices", null);
  const [invoices, dispatch] = useReducer(invoicesReducer, []);
  const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    let storedInvoices = readValue();

    if (!storedInvoices) {
      storedInvoices = data as Invoice[];

      store(storedInvoices);
    }

    dispatch({
      type: "set",
      payload: storedInvoices,
    });
  }, []);

  const invoiceProviderValue = useMemo(
    () => ({
      invoices,
      dispatch,
      statusFilter,
      setStatusFilter,
      invoiceToEdit,
      setInvoiceToEdit,
      isFormOpen,
      setIsFormOpen,
    }),
    [invoices, statusFilter, invoiceToEdit, isFormOpen],
  );

  return <InvoiceContext.Provider value={invoiceProviderValue}>{children}</InvoiceContext.Provider>;
}
