import { uniqueId } from "lodash";

export const getLabels = () => {
  const data = [];

  for (let i = 0; i < 30; i++) {
    data.push({
      id: uniqueId("labels-row"),
      label: `John Doe${i}`,
      cellId: uniqueId("labels-cell"),
    });
  }

  return data;
};
