import { LogEntry } from "@/lib/dbTypes";
import { SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import getLogLabel from "@/features/Logs/Helpers/getLogLabel";
import useShowModal from "@/shared/providers/ModalContext/ContextHooks/useShowModal";
import { CONFIRM_LOG_DELETION_MODAL } from "@/components/Modals/constants";

const DrawerContent = ({ log }: { log: LogEntry }) => {
  const { id } = log;
  const { push } = useRouter();
  const label = getLogLabel(log);
  const showModal = useShowModal();

  const onDelete = () => {
    showModal(CONFIRM_LOG_DELETION_MODAL, log);
  };

  return (
    <div className="py-2 px-4 flex flex-col min-h-[33vh]">
      <div className="font-medium text-sm md:text-lg mb-2 py-2 md:py-4">
        Manage <p className="text-zinc-700">{label}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-outline flex-1 btn-sm py-2 md:btn-md"
          onClick={() => push(`/admin/logs/${id}/edit`)}
        >
          <SquarePen className="size-5" />
          Edit
        </button>
        <button
          className="btn btn-outline btn-error flex-1 btn-sm py-2 md:btn-md"
          onClick={onDelete}
        >
          <Trash className="size-5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DrawerContent;
