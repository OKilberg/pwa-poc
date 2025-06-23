import { getTimeDifferenceISO } from "@/util/util";
import { Dayjs } from "dayjs";

const getDuration = (startDate: Dayjs | null, endDate: Dayjs | null) => {
  const duration =
    startDate && endDate
      ? getTimeDifferenceISO(startDate?.toISOString(), endDate?.toISOString())
      : { hours: 0, minutes: 0 };

  return duration;
};

export default getDuration;
