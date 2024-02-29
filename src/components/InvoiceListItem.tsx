import { Link } from "react-router-dom";
import { Invoice } from "@/types";
import { InvoiceStatusTag } from "./InvoiceStatusTag";
import { formatToDollar, formatDate } from "@/utils";
import arrowRight from "@/assets/icon-arrow-right.svg";

type Props = {
  invoice: Invoice;
};

export function InvoiceListItem({ invoice }: Readonly<Props>) {
  const colsClasses =
    "grid-cols-[1fr_1fr] grid-rows-[2fr_0.5fr_0.5fr] md:grid-cols-[5rem_9rem_1fr_auto_auto_auto] md:grid-rows-1";

  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className={`${colsClasses} mb-4 grid items-center rounded border border-white bg-white px-6 py-4 text-body text-gray-950 shadow-card transition-[border-color] duration-300 hover:border-violet motion-reduce:transition-none dark:border-gray-800 dark:bg-gray-800 dark:text-white dark:hover:border-violet`}
    >
      <h6 className="text-heading-s-variant font-bold">
        <span className="text-blue-gray-300">#</span>
        {invoice.id}
      </h6>

      <span className="text-blue-gray-300 dark:text-gray-200">
        <span className="text-blue-gray-400 dark:text-gray-200">Due</span>{" "}
        {formatDate(new Date(invoice.createdAt))}
      </span>

      <span className="col-start-2 row-start-1 text-right text-blue-gray-400 dark:text-white md:col-start-3 md:row-start-1 md:text-left">
        {invoice.clientName}
      </span>

      <span className="col-start-1 justify-self-start text-right text-heading-s font-bold md:col-start-4 md:mr-10">
        {formatToDollar(invoice.total)}
      </span>

      <div className="col-start-2 row-span-2 row-start-2 justify-self-end md:col-start-5 md:row-span-1 md:justify-self-start">
        <InvoiceStatusTag status={invoice.status} />
      </div>

      <img className="hidden md:ml-5 md:block" src={arrowRight} alt="" role="presentation" />
    </Link>
  );
}
