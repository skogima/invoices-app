import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import arrowLeft from "@/assets/icon-arrow-left.svg";
import { Button, InvoiceStatusTag, DeleteDialog } from "@/components";
import { useInvoices } from "@/context/InvoiceContext";
import type { Invoice } from "@/types";
import { formatToDollar, formatDate } from "@/utils";

export function Invoice() {
  const { invoices, dispatch, setInvoiceToEdit } = useInvoices();
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);

  const params = useParams<{ id: string }>();

  const invoice = invoices.find((invoice) => invoice.id == params.id);

  function deleteInvoice(_invoice: Invoice) {
    dispatch({
      type: "delete",
      payload: _invoice,
    });
    navigate("/");
  }

  function markAsPaid(_invoice: Invoice) {
    dispatch({
      type: "update",
      payload: { ..._invoice, status: "paid" },
    });
  }

  return (
    <section className="mt-8 w-full text-body-variant text-blue-gray-300 dark:text-gray-200 sm:mt-16">
      <div className="mx-auto w-full max-w-3xl px-6">
        <Link
          to="/"
          className="flex max-w-max items-start gap-6 text-heading-s-variant text-gray-950 hover:text-blue-gray-300 dark:text-white dark:hover:text-blue-gray-400"
        >
          <img src={arrowLeft} alt="" role="presentation" className="h-[12px] w-[9px]" />
          <span>Go back</span>
        </Link>

        {!!invoice && (
          <>
            {showDelete && (
              <DeleteDialog
                invoiceId={invoice.id}
                onCancel={() => setShowDelete(false)}
                onConfirm={() => deleteInvoice(invoice)}
              />
            )}

            <div className="mt-8 flex items-center justify-between rounded bg-white px-6 py-5 shadow-card dark:bg-gray-800 sm:justify-start sm:px-8">
              <span className="mr-5">Status</span>
              <InvoiceStatusTag status={invoice.status} />

              <div className="ml-auto hidden items-center gap-x-2 sm:flex">
                <Button variant="secondary" onClick={() => setInvoiceToEdit(invoice)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => setShowDelete(true)}>
                  Delete
                </Button>
                {invoice.status == "pending" && (
                  <Button variant="primary" onClick={() => markAsPaid(invoice)}>
                    Mark as Paid
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6 rounded bg-white p-6 text-body shadow-card dark:bg-gray-800 sm:px-8 md:p-12">
              <div className="mb-8 grid grid-cols-1 gap-8 sm:mb-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-heading-s text-gray-950 dark:text-white">
                    <span className="text-blue-gray-400">#</span>
                    {invoice.id}
                  </h4>

                  <p className="mt-2 ">{invoice.description}</p>
                </div>

                <div className="flex flex-col text-left sm:text-right">
                  <span>{invoice.senderAddress.street}</span>
                  <span>{invoice.senderAddress.city}</span>
                  <span>{invoice.senderAddress.postCode}</span>
                  <span>{invoice.senderAddress.country}</span>
                </div>
              </div>

              <div className=" flex flex-wrap justify-between gap-8">
                <div className="flex-grow space-y-8">
                  <div>
                    <h6 className="mb-3 text-blue-gray-300 dark:text-gray-200">Invoice Date</h6>
                    <span className="text-heading-s font-bold text-gray-950 dark:text-white">
                      {formatDate(new Date(invoice.createdAt))}
                    </span>
                  </div>
                  <div>
                    <h6 className="mb-3 text-blue-gray-300 dark:text-gray-200">Payment Due</h6>
                    <span className="text-heading-s font-bold text-gray-950 dark:text-white">
                      {formatDate(new Date(invoice.paymentDue))}
                    </span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col text-body">
                  <h6 className="mb-3 text-blue-gray-300 dark:text-gray-200">Bill To</h6>

                  <span className="mb-2 text-heading-s font-bold text-gray-950 dark:text-white">
                    {invoice.clientName}
                  </span>

                  <span>{invoice.clientAddress.street}</span>
                  <span>{invoice.clientAddress.city}</span>
                  <span>{invoice.clientAddress.postCode}</span>
                  <span>{invoice.clientAddress.country}</span>
                </div>

                <div className="flex-grow">
                  <h6 className="mb-3 text-blue-gray-300 dark:text-gray-200">Sent to</h6>
                  <span className="text-heading-s font-bold text-gray-950 dark:text-white">
                    {invoice.clientEmail}
                  </span>
                </div>
              </div>

              <div className="mt-11 w-full overflow-hidden rounded bg-gray-50 dark:bg-gray-700">
                <table className="w-full table-fixed border-collapse border-spacing-0 md:table-auto">
                  <thead className="hidden text-body text-blue-gray-300 dark:text-gray-200 sm:table-header-group">
                    <tr>
                      <th scope="col" className="p-6 pb-0 text-left font-medium sm:p-8">
                        Item Name
                      </th>
                      <th scope="col" className="p-6 pb-0 text-center font-medium sm:p-8">
                        QTY.
                      </th>
                      <th scope="col" className="p-6 pb-0 text-right font-medium sm:p-8">
                        Price
                      </th>
                      <th scope="col" className="p-6 pb-0 text-right font-medium sm:p-8">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoice.items.map((product, i) => (
                      <tr
                        key={i}
                        className="text-heading-s-variant font-bold text-gray-950 dark:text-white"
                      >
                        <td
                          className={`text-nowrap p-6 ${i > 0 ? "pt-0" : ""} text-left sm:p-8 sm:pt-0`}
                        >
                          <span className="mb-2 block">{product.name}</span>
                          <span className="block text-blue-gray-400 sm:hidden">
                            {product.quantity + " x " + formatToDollar(product.price)}
                          </span>
                        </td>
                        <td className="hidden p-8 pt-0 text-center text-blue-gray-300 dark:text-gray-200 sm:table-cell">
                          {product.quantity}
                        </td>
                        <td className="hidden p-8 pt-0 text-right text-blue-gray-300 dark:text-gray-200 sm:table-cell">
                          {formatToDollar(product.price)}
                        </td>
                        <td className={`p-6 text-right ${i > 0 ? "pt-0" : ""} sm:p-8 sm:pt-0`}>
                          {formatToDollar(product.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot className="bg-gray-600 text-white dark:bg-gray-950">
                    <tr>
                      <th className="p-6 pr-2 text-left text-body sm:p-8">Amount Due</th>
                      <th className="hidden sm:table-cell"></th>
                      <th className="hidden sm:table-cell"></th>
                      <th className="p-6 pl-2 text-right text-heading-m tracking-[-0.5px] sm:p-8">
                        {formatToDollar(invoice.total)}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {!!invoice && (
        <div className="mt-14 flex w-full items-center justify-end gap-x-2 bg-white p-6 shadow-card dark:bg-gray-800 sm:hidden">
          <Button variant="secondary" onClick={() => setInvoiceToEdit(invoice)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => setShowDelete(true)}>
            Delete
          </Button>
          {invoice.status == "pending" && (
            <Button variant="primary" onClick={() => markAsPaid(invoice)}>
              Mark as Paid
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
