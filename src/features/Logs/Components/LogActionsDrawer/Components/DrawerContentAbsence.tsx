import { WorkAbsence } from "@/lib/dbTypes";
import { ListItem } from "@mui/material";
import { SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import getReadableAbsence from "@/features/Logs/Helpers/getReadableAbsence";
import useArchiveAbsence from "../Hooks/useArchiveAbsence";

const getLabel = (absence: WorkAbsence) => {
  const { id, duration, startDate, endDate, month } =
    getReadableAbsence(absence);

  const label = `Absence #${id} (${month} ${startDate} - 
  ${endDate}, ${duration})`;

  return label;
};

const DrawerContent = ({ absence }: { absence: WorkAbsence }) => {
  const { id } = absence;
  const { push } = useRouter();
  const archiveAbsence = useArchiveAbsence();
  const label = getLabel(absence);

  return (
    <div className="py-2 flex flex-col gap-2 min-h-[33vh]">
      <ListItem className="font-bold text-lg">{label}</ListItem>
      <ListItem
        className="px-4 py-2 gap-4 bg-white"
        onClick={() => push(`/admin/absences/${id}/edit`)}
      >
        <SquarePen className="size-5" />
        Edit
      </ListItem>
      <ListItem
        className="px-4 py-2 gap-4 text-red-500 bg-white"
        onClick={() => archiveAbsence(absence)}
      >
        <Trash className="size-5" />
        Delete
      </ListItem>
    </div>
  );
};

export default DrawerContent;
