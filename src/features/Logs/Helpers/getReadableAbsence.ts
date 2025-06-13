import { fullMonthNames } from "@/lib/date/constants";
import { WorkAbsence } from "@/lib/dbTypes";
import { getAbsenceDuration } from "@/util/util";
import dayjs from "dayjs";

const getReadableLog = (absence: WorkAbsence) => {
  const { id, dateStart, month, note, dateEnd, userId, year } = absence;

  const duration = getAbsenceDuration(dateStart, dateEnd);
  const startDate = dayjs(dateStart).format("YYYY-MM-DD");
  const endDate = dayjs(dateEnd).format("YYYY-MM-DD");

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

export default getReadableLog;
