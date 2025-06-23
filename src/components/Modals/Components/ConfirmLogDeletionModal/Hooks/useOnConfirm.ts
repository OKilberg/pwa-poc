import useArchiveLog from "@/features/Logs/Components/LogActionsDrawer/Hooks/useArchiveLog";
import useSelectedLog from "./useSelectedLog";
import useCloseModal from "@/shared/providers/ModalContext/ContextHooks/useCloseModal";

const useOnConfirm = () => {
  const selectedLog = useSelectedLog();
  const archiveLog = useArchiveLog();
  const closeModal = useCloseModal();

  const onConfirm = () => {
    if (selectedLog) {
      archiveLog(selectedLog);
      closeModal();
    }
  };

  return onConfirm;
};

export default useOnConfirm;
