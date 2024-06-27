import { InvoiceForm } from ".";
import { useInvoices } from "@/context/InvoiceContext";

export function FormContainer() {
  const { invoiceToEdit, isFormOpen, setIsFormOpen, setInvoiceToEdit } = useInvoices();

  function handleCloseForm() {
    setIsFormOpen(false);
    setInvoiceToEdit(null);
  }

  return (
    (isFormOpen || !!invoiceToEdit) && (
      <div className="fixed inset-0 z-10 h-full w-full bg-black/40">
        <aside className="relative mt-20 h-[calc(100%-5rem)] max-w-[634px] animate-slide-in rounded-r-none bg-white text-gray-950 dark:bg-gray-900 dark:text-gray-200 sm:rounded-r-lg lg:ml-[85px] lg:mt-0 lg:h-full">
          <InvoiceForm closeForm={handleCloseForm} />
        </aside>
      </div>
    )
  );
}
