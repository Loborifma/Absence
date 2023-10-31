import { addDays, addMonths, format } from "date-fns";
import { uniqueId } from "lodash";

export function getDaysInMonth(year, month) {
  let date = new Date(year, month, 1);
  const days = [];
  const formattedMonth = format(new Date(date), "MMMM yyyy");

  while (date.getMonth() === month) {
    days.push({
      id: uniqueId("header-days"),
      day: format(new Date(date), "dd eeee"),
    });
    date = addDays(date, 1);
  }

  return {
    formattedMonth,
    days,
  };
}

export function getDaysInYear(year) {
  let date = new Date(year, 0, 1);
  const days = [];

  while (date.getFullYear() === year) {
    days.push(getDaysInMonth(year, date.getMonth()));
    date = addMonths(date, 1);
  }

  return days;
}

export const twoMonth = [getDaysInMonth(2023, 0), getDaysInMonth(2023, 1)];
