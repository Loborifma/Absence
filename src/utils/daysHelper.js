export const getAmountOfDays = (from, to) => {
  return (
    Math.floor((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)) + 1
  );
};
