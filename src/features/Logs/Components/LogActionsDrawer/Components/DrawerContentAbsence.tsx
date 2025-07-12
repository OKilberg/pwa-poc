import { WorkAbsence } from "@/lib/dbTypes";
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
      <div className="font-medium text-sm md:text-lg mb-2 py-2 md:py-4">
        Manage <p className="text-zinc-700">{label}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-outline flex-1 btn-sm py-2 md:btn-md"
          onClick={() => push(`/admin/absences/${id}/edit`)}
        >
          <SquarePen className="size-5" />
          Edit
        </button>
        <button
          className="btn btn-outline btn-error flex-1 btn-sm py-2 md:btn-md"
          onClick={() => showModal(CONFIRM_ABSENCE_DELETION_MODAL, absence)}
        >
          <Trash className="size-5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DrawerContent;
