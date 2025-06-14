import { editWorkAbsence } from "@/lib/db/absence";
import { AbsenceCause, NewWorkAbsence } from "@/lib/dbTypes";
import {
  clearAbsenceEditCacheKey,
  clearAbsencesCacheKey,
} from "@/lib/queryCache/queryCache";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useOnSubmit = () => {
  const { refresh } = useRouter();
  const onSubmit = (
    startDate: Dayjs,
    endDate: Dayjs | null,
    cause: AbsenceCause,
    note: string | undefined,
    id: number,
    userId: number
  ) => {
    const absenceNote = note ? note : null;

    const absence: Omit<NewWorkAbsence, "userId"> = {
      dateStart: startDate.toISOString(),
      dateEnd: endDate ? endDate.toISOString() : startDate.toISOString(),
      month: startDate.get("month"),
      year: startDate.get("year"),
      cause,
      note: absenceNote,
    };

    editWorkAbsence(id, absence)
      .then(() => {
        toast.success(`Work absence updated.`);
        clearAbsencesCacheKey(userId, absence.dateStart);
        clearAbsenceEditCacheKey(id);
        refresh();
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
