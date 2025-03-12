import useCurrentTime from "./useCurrentTime";

const useCurrentDate = () => {
  const currentTime = useCurrentTime();

  const currentDate = currentTime.toLocaleDateString("en-EN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return currentDate;
};

export default useCurrentDate;
