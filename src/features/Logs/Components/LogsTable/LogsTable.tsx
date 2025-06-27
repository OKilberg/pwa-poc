import useFilteredAbsences from "../../Hooks/useFilteredAbsences";
import useFilteredLogs from "../../Hooks/useFilteredLogs";
import AbsenceRow from "./Components/AbsenceRow/AbsenceRow";
import LogRow from "./Components/LogRow/LogRow";
import LogsTableHeader from "./Components/LogsTableHeader/LogsTableHeader";

const LogsTable = () => {
  const filteredLogs = useFilteredLogs();
  const filteredAbsences = useFilteredAbsences();

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-pin-cols">
        <LogsTableHeader />
        <tbody>
          {filteredLogs.map((log) => (
            <LogRow key={log.id} log={log} />
          ))}
          {filteredAbsences.map((absence) => (
            <AbsenceRow key={absence.id} absence={absence} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;
