import { Invoice } from "@/types";
import { InvoiceListItem } from "./InvoiceListItem";
import emptyIllustration from "@/assets/illustration-empty.svg";

const ANIMATION_INTERVAL = 100;

type Props = {
  invoices: Invoice[];
};

export function InvoiceList({ invoices }: Readonly<Props>) {
  return (
    <>
      {!!invoices.length && (
        <div className="flex w-full flex-col justify-center">
          {invoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * ANIMATION_INTERVAL}ms`,
                opacity: 0,
              }}
            >
              <InvoiceListItem invoice={invoice} />
            </div>
          ))}
        </div>
      )}

      {!invoices.length && (
        <div className="flex flex-1 items-center justify-center">
          <div className="mb-48 flex w-60 flex-col items-center">
            <img src={emptyIllustration} alt="Illustration: no items to display" />

            <h3 className="mb-6 mt-10 text-heading-m font-bold text-gray-950 dark:text-white">
              There is nothing here.
            </h3>
            <p className="w-[80%] text-center text-body text-blue-gray-400 dark:text-gray-200">
              Create an invoice by clicking the <span className="font-bold">New</span> button and
              get started
            </p>
          </div>
        </div>
      )}
    </>
  );
}
