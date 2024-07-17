/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { Invoice, InvoiceStatus } from "@/domain";
import { useLocalStorage } from "@/hooks";
import fakeInvoices from "@/const/data.json";
import { invoicesReducer, InvoiceAction } from "./invoiceReducer";

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

export function useInvoices() {
  return useContext(InvoiceContext);
}

export function InvoiceProvider({ children }: PropsWithChildren<object>) {
  const { readValue, store } = useLocalStorage<Invoice[] | null>("invoices", null);
  const [invoices, dispatch] = useReducer(invoicesReducer, []);
  const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    let storedInvoices = readValue();

    if (!storedInvoices) {
      storedInvoices = fakeInvoices as Invoice[];
    }

    dispatch({
      type: "set",
      payload: storedInvoices,
    });
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      store(invoices);
    }

    return () => {
      isFirstRender.current = false;
    };
  }, [invoices]);

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
