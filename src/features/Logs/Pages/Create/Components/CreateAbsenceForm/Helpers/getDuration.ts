import { getAbsenceDuration } from "@/util/util";
import { Dayjs } from "dayjs";

const getDuration = (startDate: Dayjs | null, endDate: Dayjs | null) => {
  const duration =
    startDate && endDate
      ? getAbsenceDuration(startDate.toISOString(), endDate.toISOString())
      : "0";

  return duration;
};

export default getDuration;
