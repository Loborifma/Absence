import { addDays } from "date-fns";
import { random, uniqueId } from "lodash";

export const getLabels = () => {
  const data = [];

  for (let i = 0; i < 30; i++) {
    const randomDate = new Date(
      2023,
      random(9, 11, false),
      random(1, 30, false)
    ).setHours(0);

    i === 0
      ? data.push({
          id: `labels${i}`,
          label: `John Doe${i}`,
          absences: [],
        })
      : data.push({
          id: `labels${i}`,
          label: `John Doe ${i}`,
          absences: [
            {
              id: uniqueId("absence"),
              from: randomDate,
              to: addDays(randomDate, random(0, 10, false)).setHours(0),
              substitute: "John Doe 0",
            },
            {
              id: uniqueId("absence"),
              from: randomDate,
              to: addDays(randomDate, random(0, 10, false)).setHours(0),
              substitute: "John Doe 0",
            },
            {
              id: uniqueId("absence"),
              from: randomDate,
              to: addDays(randomDate, random(0, 10, false)).setHours(0),
              substitute: "John Doe 0",
            },
          ],
        });
  }

  return data;
};

export const fetchDaysInYearToLabels = (days, labels) => {
  return labels.map((el) => {
    return { ...el, days: [...days] };
  });
};
