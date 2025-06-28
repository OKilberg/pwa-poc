import useDateLogs from "./Hooks/useDateLogs";
import DateLogItem from "./Components/DateLogItem/DateLogItem";
import useDateAbsences from "./Hooks/useDateAbsences";
import DateAbsenceItem from "./Components/DateAbsenceItem/DateAbsenceItem";

const DateAttendance = () => {
  const dateLogs = useDateLogs();
  const dateAbsences = useDateAbsences();

  return (
    <div className="flex flex-col gap-2">
      {dateLogs.map((log) => (
        <DateLogItem key={log.id} log={log} />
      ))}
      {dateAbsences.map((absence) => (
        <DateAbsenceItem key={absence.id} absence={absence} />
      ))}
    </div>
  );
};

export default DateAttendance;
