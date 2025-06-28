import { Dayjs } from "dayjs";
import useCalendarContext from "./useCalendarContext";

const useCalendarSetDate = () => {
  const { setDate } = useCalendarContext();

  const setCalendarDate = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  return setCalendarDate;
};

export default useCalendarSetDate;
