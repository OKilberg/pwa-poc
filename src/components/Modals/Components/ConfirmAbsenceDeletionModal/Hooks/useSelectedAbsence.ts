import { WorkAbsence } from "@/lib/dbTypes";
import useModalData from "@/shared/providers/ModalContext/ContextHooks/useModalData";

const useSelectedAbsence = () => {
  const selectedAbsence = useModalData() as WorkAbsence | null;

  return selectedAbsence;
};

export default useSelectedAbsence;
