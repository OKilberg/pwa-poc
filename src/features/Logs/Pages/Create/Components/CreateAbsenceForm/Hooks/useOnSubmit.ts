import { addWorkAbsence } from "@/lib/db/absence";
import { AbsenceCause, NewWorkAbsence } from "@/lib/dbTypes";
import { clearAbsencesCacheKey } from "@/lib/queryCache/queryCache";
import { Dayjs } from "dayjs";
import toast from "react-hot-toast";

const useOnSubmit = () => {
  const onSubmit = (
    startDate: Dayjs,
    endDate: Dayjs | null,
    employee: string,
    cause: AbsenceCause,
    note: string | undefined,
    onSuccess: () => void
  ) => {
    const absenceNote = note ? note : null;

    const absence: NewWorkAbsence = {
      userId: Number(employee),
      dateStart: startDate.toISOString(),
      dateEnd: endDate ? endDate.toISOString() : startDate.toISOString(), // set same as dateStart if one day
      month: startDate.get("month"),
      year: startDate.get("year"),
      cause,
      note: absenceNote,
    };

    addWorkAbsence(absence)
      .then(() => {
        // clearCacheKeys([""]);
        toast.success(`Work absence reported.`);
        clearAbsencesCacheKey(absence.userId, absence.dateStart);
        onSuccess();
      })
      .catch((error) => {
        toast.error(
          `Something went wrong. Could not add report absence: ${error}`
        );
      });
  };

  return onSubmit;
};

export default useOnSubmit;
