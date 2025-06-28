import useCalendarDate from "@/features/Calendar/Context/ContextHooks/useCalendarDate";
import { getRecordsByDate } from "@/lib/db/logs";
import useQuery from "@/shared/hooks/useQuery";

const useDateLogs = () => {
  const calendarDate = useCalendarDate();

  const dateFormatted = calendarDate.format("YYYY-MM-DD");
  const key = String(`date-${dateFormatted}`);

  const dateLogs = useQuery({
    fn: () => getRecordsByDate(dateFormatted),
    key: key,
  });

  return dateLogs;
};

export default useDateLogs;
