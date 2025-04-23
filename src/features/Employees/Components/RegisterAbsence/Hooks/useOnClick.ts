import { addWorkAbsence } from "@/lib/db/absence";
import { AbsenceCause, NewWorkAbsence } from "@/lib/dbTypes";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useOnClick = () => {
  const { push } = useRouter();
  const onClick = (
    id: number,
    cause: AbsenceCause,
    dateStart: Dayjs,
    dateEnd: Dayjs | null,
    note: string | undefined
  ) => {
    const absenceNote = note ? note : null;

    const absence: NewWorkAbsence = {
      userId: id,
      dateStart: dateStart.toISOString(),
      dateEnd: dateEnd ? dateEnd.toISOString() : dateStart.toISOString(), // set same as dateStart if one day
      month: dateStart.get("month"),
      year: dateStart.get("year"),
      cause,
      note: absenceNote,
    };

    addWorkAbsence(absence)
      .then(() => {
        // clearCacheKeys([""]);
        toast.success(`Work absence reported.`);
        push("/admin/employees");
      })
      .catch((error) => {
        toast.error(
          `Something went wrong. Could not add report absence: ${error}`
        );
      });
  };

  return onClick;
};

export default useOnClick;
