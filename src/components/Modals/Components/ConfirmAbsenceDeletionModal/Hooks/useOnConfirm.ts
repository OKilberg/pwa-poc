import useArchiveAbsence from "@/features/Logs/Components/LogActionsDrawer/Hooks/useArchiveAbsence";
import useSelectedAbsence from "./useSelectedAbsence";
import useCloseModal from "@/shared/providers/ModalContext/ContextHooks/useCloseModal";

const useOnConfirm = () => {
  const selectedAbsence = useSelectedAbsence();
  const archiveAbsence = useArchiveAbsence();
  const closeModal = useCloseModal();

  const onConfirm = () => {
    if (selectedAbsence) {
      archiveAbsence(selectedAbsence);
      closeModal();
    }
  };

  return onConfirm;
};

export default useOnConfirm;
