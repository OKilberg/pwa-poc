import { WorkAbsence } from "@/lib/dbTypes";
import getReadableAbsence from "./getReadableAbsence";

const getLogLabel = (absence: WorkAbsence) => {
  const { id, duration, startDate, endDate, month } =
    getReadableAbsence(absence);

  const showEndDate = startDate !== endDate;

  const label = `Absence #${id} (${month} ${startDate}
  ${showEndDate ? endDate : ""}, ${duration})`;

  return label;
};

export default getLogLabel;
