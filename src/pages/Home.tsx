import { Button, InvoiceFilter, InvoiceList } from "@/components";
import plusIcon from "@/assets/icon-plus.svg";
import { useInvoices } from "@/context/InvoiceContext";
import { getFilteredInvoices } from "@/utils";

export function Home() {
  const { invoices, statusFilter, setStatusFilter, setIsFormOpen } = useInvoices();

  const filteredInvoices = getFilteredInvoices(invoices, statusFilter);

  return (
    <div className="mx-6 mt-20 flex w-full max-w-3xl flex-col">
      <div className="mb-16 flex w-full items-center justify-between">
        <div>
          <h1 className="text-heading-m text-gray-950 dark:text-white sm:text-heading-l">
            Invoices
          </h1>
          <h4 className="mt-1.5 text-body text-blue-gray-400 dark:text-gray-200">No invoices</h4>
        </div>

        <div className="flex items-center gap-x-5 sm:gap-x-10">
          <InvoiceFilter status={statusFilter} handleStatusSelected={setStatusFilter} />

          <Button variant="primary" className="pl-2 pr-4" onClick={() => setIsFormOpen(true)}>
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white sm:mr-4">
              <img src={plusIcon} role="presentation" alt="" />
            </div>
            <span className="text-heading-s-variant">New</span>
            <span className="ml-1 hidden text-heading-s-variant sm:block">Invoice</span>
          </Button>
        </div>
      </div>

      <InvoiceList invoices={filteredInvoices} />
    </div>
  );
}
