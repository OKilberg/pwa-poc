import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useCalendarSetDate from "../../Context/ContextHooks/useCalendarSetDate";
import useCalendarDate from "../../Context/ContextHooks/useCalendarDate";

const CalendarDatePicker = () => {
  const calendarSetDate = useCalendarSetDate();
  const calendarDate = useCalendarDate();

  return (
    <DatePicker
      disableFuture
      label="Select a date"
      value={calendarDate}
      onChange={calendarSetDate}
    />
  );
};

export default CalendarDatePicker;
