import { WorkAbsence } from "@/lib/dbTypes";
import { ListItem } from "@mui/material";
import { SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import getReadableAbsence from "@/features/Logs/Helpers/getReadableAbsence";
import useShowModal from "@/shared/providers/ModalContext/ContextHooks/useShowModal";
import { CONFIRM_ABSENCE_DELETION_MODAL } from "@/components/Modals/constants";

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
  const showModal = useShowModal();
  const label = getLabel(absence);

  return (
    <div className="py-2 px-4 flex flex-col min-h-[33vh]">
      <ListItem className="font-bold text-lg mb-2">{label}</ListItem>
      <ListItem
        sx={{
          py: { sm: 2 },
        }}
        className="py-2 gap-4 bg-white border border-1 border-gray-200 rounded-sm"
        onClick={() => push(`/admin/absences/${id}/edit`)}
      >
        <SquarePen className="size-5" />
        Edit
      </ListItem>
      <ListItem
        sx={{
          py: { sm: 2 },
        }}
        className="py-2 gap-4 text-red-500 bg-white border border-1 border-t-0 border-gray-200 rounded-sm"
        onClick={() => showModal(CONFIRM_ABSENCE_DELETION_MODAL, absence)}
      >
        <Trash className="size-5" />
        Delete
      </ListItem>
    </div>
  );
};

export default DrawerContent;
