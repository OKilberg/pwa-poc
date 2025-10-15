import useEmployee from "@/shared/queryState/useEmployee";
import useFilteredAbsences from "../../Hooks/useFilteredAbsences";
import useFilteredLogs from "../../Hooks/useFilteredLogs";
import AbsenceRow from "./Components/AbsenceRow/AbsenceRow";
import LogRow from "./Components/LogRow/LogRow";
import LogsTableHeader from "./Components/LogsTableHeader/LogsTableHeader";

const LogsTable = () => {
  const filteredLogs = useFilteredLogs();
  const filteredAbsences = useFilteredAbsences();
  const { employee } = useEmployee();

  const emptyTable = filteredLogs.length === 0 && filteredAbsences.length === 0;

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
          {emptyTable && !employee && (
            <tr className="w-full h-12 opacity-50 m-2">
              <td colSpan={7} className="text-center py-8">
                Select an employee in the menu above to view their logs
              </td>
            </tr>
          )}
          {emptyTable && employee && (
            <tr className="w-full h-12 opacity-50 m-2">
              <td colSpan={7} className="text-center py-8">
                No logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;
