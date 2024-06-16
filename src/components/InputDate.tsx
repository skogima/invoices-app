import { ComponentPropsWithRef, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Calendar } from "./Calendar";
import { useClickOutside } from "@/hooks";
import iconCalendar from "@/assets/icon-calendar.svg";

type Props = ComponentPropsWithRef<"div"> & {
  id: string;
  label: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
};

const dateFormat = Intl.DateTimeFormat("en-us", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export function InputDate({ id, label, disabled, register, error, errorMessage }: Readonly<Props>) {
  const [date, setDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const inputDateRef = useRef<HTMLInputElement>(null);

  useClickOutside(inputDateRef, () => {
    setShowCalendar(false);
  });

  function handleDateInput(inputDate: Date) {
    setDate(inputDate);
    setShowCalendar(false);
  }

  function handleShowCalendar() {
    setShowCalendar(!showCalendar);
  }

  return (
    <div ref={inputDateRef} className={`relative ${disabled ? "opacity-50" : ""}`}>
      <div className="mb-2 flex w-full items-center">
        {label && (
          <label className={`${error ? "text-red" : ""}`} htmlFor={id}>
            {label}
          </label>
        )}
        {errorMessage && (
          <p role="alert" className="ml-auto text-red">
            {errorMessage}
          </p>
        )}
      </div>

      <input
        id={id}
        readOnly
        type="text"
        className={`h-[48px] w-full select-none rounded border ${error ? "border-red" : "border-gray-200 focus:border-violet dark:border-gray-700 focus:dark:border-violet"} bg-white pl-5 pr-2 text-heading-s-variant font-bold text-gray-950 outline-none dark:bg-gray-800 dark:text-white ${disabled ? "" : "cursor-pointer"}`}
        onClick={handleShowCalendar}
        value={dateFormat.format(date)}
        disabled={disabled}
        {...register}
      />

      <img
        src={iconCalendar}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-x-full translate-y-1/4"
      />

      {showCalendar && (
        <Calendar className="absolute mt-2" selectedDay={date} setSelectedDay={handleDateInput} />
      )}
    </div>
  );
}
