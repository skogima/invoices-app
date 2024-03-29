import { useState, useRef } from "react";
import { InvoiceStatus } from "@/types/Invoice";
import { useClickOutside } from "@/hooks";
import arrowDown from "@/assets/icon-arrow-down.svg";
import checkIcon from "@/assets/icon-check.svg";

type Props = {
  status: InvoiceStatus | null;
  handleStatusSelected(option: InvoiceStatus | null): void;
};

type StatusList = { text: string; value: InvoiceStatus };

const statusList: StatusList[] = [
  { text: "Draft", value: "draft" },
  { text: "Pending", value: "pending" },
  { text: "Paid", value: "paid" },
];

export function InvoiceFilter({ handleStatusSelected, status }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const filterMenu = useRef<HTMLDivElement>(null);

  useClickOutside(filterMenu, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative text-heading-s-variant text-gray-900 dark:text-white" ref={filterMenu}>
      <button className="flex items-center space-x-4 font-bold" onClick={() => setIsOpen(!isOpen)}>
        <span>
          Filter <span className="hidden sm:inline">by status</span>
        </span>
        <img
          src={arrowDown}
          role="presentation"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          alt=""
        />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 z-40 h-32 w-48 -translate-x-1/2 translate-y-2 rounded bg-white p-6 drop-shadow-menu dark:bg-gray-700">
          <ul className="space-y-4 font-bold">
            {statusList.map((statusItem) => (
              <li key={statusItem.value} className="group">
                <label className="flex items-center hover:cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={statusItem.value}
                    className="hidden"
                    checked={status == statusItem.value}
                    onChange={() => handleStatusSelected(statusItem.value)}
                    onClick={() => handleStatusSelected(null)}
                  />
                  <span
                    className={`mr-4 flex h-4 w-4 items-center justify-center rounded-[2px] group-hover:border group-hover:border-violet ${
                      statusItem.value == status ? "bg-violet" : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  >
                    {statusItem.value == status && <img src={checkIcon} alt="" />}
                  </span>
                  <span>{statusItem.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
