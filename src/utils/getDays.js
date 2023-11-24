import { addDays, format } from "date-fns";
import { uniqueId } from "lodash";

export function getDaysInMonth(year, month) {
  let currentMonth = month;
  let currentYear = year;

  if (month < 0) {
    currentYear--;
    currentMonth += 12;
  }
  if (month > 11) {
    currentYear++;
    currentMonth -= 12;
  }

  let dateUTC = new Date(currentYear, currentMonth, 1);
  const days = [];
  const formattedMonth = format(new Date(dateUTC), "MMMM yyyy");

  while (dateUTC.getMonth() === currentMonth) {
    days.push({
      id: uniqueId("header-days"),
      day: format(new Date(dateUTC), "dd eeee"),
      date: dateUTC.setHours(0),
    });
    dateUTC = addDays(dateUTC, 1);
  }

  return {
    formattedMonth,
    daysOfMonth: days,
  };
}

