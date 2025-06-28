import dayjs, { Dayjs } from "dayjs";
import { createContext } from "react";

export type CalendarContextProps = {
  date: Dayjs;
  setDate: (date: Dayjs) => void;
};

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

export default CalendarContext;
