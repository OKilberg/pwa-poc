import dayjs from "dayjs";
import { parseAsNumberLiteral, useQueryState } from "nuqs";

export const years = [2025, 2026] as const;

export type YEARS = (typeof years)[number];

const useYear = () => {
  const defaultYear = dayjs().year() as YEARS;

  const [year, setYear] = useQueryState(
    "year",
    parseAsNumberLiteral(years).withDefault(defaultYear)
  );

  return { year, setYear };
};

export default useYear;
