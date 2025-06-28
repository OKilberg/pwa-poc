import useCalendarContext from "./useCalendarContext";

const useCalendarDate = () => {
  const { date } = useCalendarContext();

  return date;
};

export default useCalendarDate;
