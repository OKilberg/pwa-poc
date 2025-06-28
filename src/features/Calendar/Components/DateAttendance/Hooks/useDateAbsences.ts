import useCalendarDate from "@/features/Calendar/Context/ContextHooks/useCalendarDate";
import { getWorkAbsencesByDate } from "@/lib/db/absence";
import useQuery from "@/shared/hooks/useQuery";

const useDateAbsences = () => {
  const calendarDate = useCalendarDate();

  const dateFormatted = calendarDate.format("YYYY-MM-DD");
  const key = String(`date-${dateFormatted}`);

  const dateAbsence = useQuery({
    fn: () => getWorkAbsencesByDate(calendarDate.toISOString()),
    key: `absence-${key}`,
  });

  return dateAbsence;
};

export default useDateAbsences;
