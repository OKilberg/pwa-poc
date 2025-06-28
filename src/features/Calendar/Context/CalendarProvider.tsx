import { ParentComponent } from "@/shared/components/types";
import CalendarContext from "./CalendarContext";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const CalendarProvider = ({ children }: ParentComponent) => {
  const [date, setDate] = useState<Dayjs>(dayjs());

  return (
    <CalendarContext
      value={{
        date,
        setDate,
      }}
    >
      {children}
    </CalendarContext>
  );
};

export default CalendarProvider;
