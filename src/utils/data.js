import { addDays, format } from "date-fns";
import { random, uniqueId } from "lodash";

export const getLabels = () => {
  const data = [];

  for (let i = 0; i < 30; i++) {
    const randomDate = new Date(
      2023,
      random(9, 11, false),
      random(1, 30, false)
    );

    const endRandomDate = addDays(randomDate, random(0, 10, false));

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
              from: format(randomDate, "yyyy-MM-dd"),
              to: format(endRandomDate, "yyyy-MM-dd"),
              substitute: "John Doe 0",
            },
          ],
        });
  }

  return data;
};
