import { absenceCauses } from "@/lib/constants";
import { fullMonthNames } from "@/lib/date/constants";
import { WorkAbsence } from "@/lib/dbTypes";
import { getAbsenceDuration } from "@/util/util";
import dayjs from "dayjs";

const getReadableAbsence = (absence: WorkAbsence) => {
  const { id, dateStart, month, note, dateEnd, userId, year } = absence;

  const duration = getAbsenceDuration(dateStart, dateEnd);
  const startDate = dayjs(dateStart).format("D/M");
  const endDate = dayjs(dateEnd).format("D/M");

  const monthReadable = fullMonthNames[month];

  return {
    id,
    userId,
    startDate,
    endDate,
    duration,
    month: monthReadable,
    year,
    note,
  };
};

export default getReadableAbsence;
