import dayjs from "dayjs";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export const months = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
] as const;

export type MONTHS = (typeof months)[number];

const useMonth = () => {
  const currentMonth = dayjs().month();
  const defaultMonth = String(currentMonth) as MONTHS;

  const [month, setMonth] = useQueryState(
    "month",
    parseAsStringLiteral(months).withDefault(defaultMonth)
  );

  return { month, setMonth };
};

export default useMonth;
