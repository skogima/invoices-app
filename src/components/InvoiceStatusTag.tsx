import type { InvoiceStatus } from "@/domain";

const statusStyle: Record<InvoiceStatus, string> = {
  paid: "bg-green/5 text-green",
  draft: "bg-gray-600/5 text-gray-600 dark:bg-gray-200/5 dark:text-gray-200",
  pending: "bg-orange/5 text-orange",
};

const statusDiscStyle: Record<InvoiceStatus, string> = {
  paid: "bg-green",
  draft: "bg-gray-600 dark:bg-gray-200",
  pending: "bg-orange",
};

export function InvoiceStatusTag({ status }: Readonly<{ status: InvoiceStatus }>) {
  return (
    <div
      className={`${statusStyle[status]} flex h-10 w-[104px] items-center justify-center rounded-sm font-bold`}
    >
      <span className={`mr-2 h-2 w-2 rounded-full ${statusDiscStyle[status]}`}></span>
      <span className="text-heading-s-variant capitalize">{status}</span>
    </div>
  );
}
