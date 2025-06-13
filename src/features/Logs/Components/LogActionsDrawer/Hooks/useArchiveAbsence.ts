import { removeWorkAbsence } from "@/lib/db/absence";
import { WorkAbsence } from "@/lib/dbTypes";
import { clearAbsencesCacheKey } from "@/lib/queryCache/queryCache";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useArchiveAbsence = () => {
  const { refresh } = useRouter();

  const archiveAbsence = (Absence: WorkAbsence) => {
    const { id, userId, dateStart } = Absence;
    removeWorkAbsence(id)
      .then(() => {
        clearAbsencesCacheKey(userId, dateStart);
        toast.success("Deleted Absence entry");
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return archiveAbsence;
};

export default useArchiveAbsence;
