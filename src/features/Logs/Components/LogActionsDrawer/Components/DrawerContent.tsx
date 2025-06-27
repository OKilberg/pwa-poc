import { LogEntry } from "@/lib/dbTypes";
import { ListItem } from "@mui/material";
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
      <ListItem className="font-medium text-lg mb-2">Manage {label}</ListItem>
      <ListItem
        sx={{
          py: { sm: 2 },
        }}
        className="py-2 gap-4 bg-white border border-1 border-gray-200 rounded-sm"
        onClick={() => push(`/admin/logs/${id}/edit`)}
      >
        <SquarePen className="size-5" />
        Edit
      </ListItem>

      <ListItem
        sx={{
          py: { sm: 2 },
        }}
        className="py-2 gap-4 text-red-500 bg-white border border-1 border-t-0 border-gray-200 rounded-sm"
        onClick={onDelete}
      >
        <Trash className="size-5" />
        Delete
      </ListItem>
    </div>
  );
};

export default DrawerContent;
