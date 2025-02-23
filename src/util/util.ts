export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
