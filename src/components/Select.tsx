import { ComponentPropsWithRef, useRef, useState } from "react";
import { useClickOutside } from "@/hooks";
import arrowDown from "@/assets/icon-arrow-down.svg";

type OptionValue = number | string;

type Option = {
  text: string;
  value: OptionValue;
};

type Props = ComponentPropsWithRef<"div"> & {
  id: string;
  items: Option[];
  label: string;
  error?: boolean;
  value: OptionValue;
  onValueChange: (value: OptionValue) => void;
};

export function Select({
  id,
  label,
  items,
  error,
  value,
  onValueChange,
  ...rest
}: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectMenu = useRef<HTMLDivElement>(null);

  const selectedText = items.find((item) => item.value == value)?.text;

  useClickOutside(selectMenu, () => {
    setIsOpen(false);
  });

  function handleSelect(item: Option) {
    onValueChange(item.value);
    setIsOpen(false);
  }

  return (
    <div {...rest} className={"space-y-2 " + rest.className}>
      <label htmlFor={id} className={`${error ? "text-red" : ""}`}>
        {label}
      </label>
      <div className="relative w-full text-heading-s-variant" ref={selectMenu}>
        <img
          src={arrowDown}
          alt=""
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`h-[48px] w-full rounded border border-solid border-gray-200 bg-white px-[20px] py-[12px] text-left outline-none ${error ? "border-red" : "focus:border-violet dark:border-gray-700"} dark:bg-gray-800 focus:dark:border-violet`}
        >
          {selectedText}
        </button>

        {isOpen && (
          <ul className="absolute top-full w-full translate-y-2 rounded bg-white drop-shadow-select dark:bg-gray-700 dark:drop-shadow-select-dark">
            {items.map((item, index) => (
              <li
                key={item.value}
                className={`${index != 0 ? "border-t border-gray-200 dark:border-gray-800" : ""}`}
              >
                <button
                  type="button"
                  className="h-full w-full px-6 py-4 text-left hover:text-violet"
                  onClick={() => handleSelect(item)}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
