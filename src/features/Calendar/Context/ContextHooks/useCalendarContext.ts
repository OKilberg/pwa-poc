import { useContext } from "react";
import CalendarContext from "../CalendarContext";

const useCalendarContext = () => {
  const calendarContext = useContext(CalendarContext);

  if (!calendarContext) {
    throw new Error("CalendarContext does not exist.");
  }

  return calendarContext;
};

export default useCalendarContext;
