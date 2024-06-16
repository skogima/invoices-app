import { ComponentPropsWithRef, useState } from "react";
import arrowLeft from "@/assets/icon-arrow-left.svg";
import arrowRight from "@/assets/icon-arrow-right.svg";

type Props = ComponentPropsWithRef<"div"> & {
  selectedDay?: Date;
  setSelectedDay: (value: Date) => void;
};

const monthYearFormat = Intl.DateTimeFormat("en-us", {
  month: "short",
  year: "numeric",
});

export function Calendar({ selectedDay, setSelectedDay, ...rest }: Props) {
  const parsedSelectedDay = createDate(
    selectedDay?.getFullYear() ?? new Date().getFullYear(),
    selectedDay?.getMonth() ?? new Date().getMonth(),
    selectedDay?.getDate() ?? new Date().getDate(),
  );

  const [selectedMonthView, setSelectedMonthView] = useState({
    year: parsedSelectedDay.getFullYear(),
    month: parsedSelectedDay.getMonth(),
  });

  const selectedMonthDate = createDate(selectedMonthView.year, selectedMonthView.month, 1);

  function createDate(year: number, month: number, day: number) {
    return new Date(year, month, day, 0, 0, 0);
  }

  function addMonth() {
    const currentDate = new Date(selectedMonthDate);
    currentDate.setMonth(currentDate.getMonth() + 1);

    setSelectedMonthView({
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    });
  }

  function subtractMonth() {
    const currentDate = new Date(selectedMonthDate);
    currentDate.setMonth(currentDate.getMonth() - 1);

    setSelectedMonthView({
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    });
  }

  function getNumberOfDaysOfMonth() {
    return createDate(
      selectedMonthDate.getFullYear(),
      selectedMonthDate.getMonth() + 1,
      0,
    ).getDate();
  }

  function getDaysList() {
    const resultDays: Date[] = [];

    const year = selectedMonthDate.getFullYear();
    const month = selectedMonthDate.getMonth();

    const firstDayOfMonth = createDate(year, month, 1);

    const startOfWeekDay = firstDayOfMonth.getDay();
    for (let i = startOfWeekDay; i > 0; i--) {
      resultDays.push(createDate(year, month, 1 - i));
    }

    for (let i = 1; i <= getNumberOfDaysOfMonth(); i++) {
      resultDays.push(createDate(year, month, i));
    }

    const lastDayOfMonth = createDate(year, month, getNumberOfDaysOfMonth());
    const endOfWeekDay = lastDayOfMonth.getDay();
    for (let i = 1; i < 7 - endOfWeekDay; i++) {
      resultDays.push(createDate(year, month + 1, i));
    }

    return resultDays;
  }

  function handleDayClick(day: Date) {
    if (day.getMonth() != selectedMonthDate.getMonth()) {
      setSelectedMonthView({
        month: day.getMonth(),
        year: day.getFullYear(),
      });
    }

    setSelectedDay(day);
  }

  return (
    <div {...rest} className={"w-60 space-y-2 " + (rest.className ?? "")}>
      <div className="rounded bg-white p-6 text-heading-s-variant font-bold text-gray-950 drop-shadow-select dark:bg-gray-700 dark:text-gray-200 dark:drop-shadow-select-dark">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => subtractMonth()}>
            <img alt="" role="presentation" src={arrowLeft} />
          </button>
          <span>{monthYearFormat.format(selectedMonthDate)}</span>
          <button type="button" onClick={() => addMonth()}>
            <img alt="" role="presentation" src={arrowRight} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-7 gap-4">
          {getDaysList().map((day, i) => (
            <button
              key={`${day}-${i}`}
              type="button"
              className={`hover:text-violet ${parsedSelectedDay?.getTime() == day.getTime() ? "text-violet" : ""} ${selectedMonthDate.getMonth() != day.getMonth() ? "opacity-10" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
