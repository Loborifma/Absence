import { uniqueId } from "lodash";

export const getLabels = () => {
  const data = [];

  for (let i = 0; i < 30; i++) {
    data.push({
      id: `labels${i}`,
      label: `John Doe${i}`,
    });
  }

  return data;
};
