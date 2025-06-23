import { LogEntry } from "@/lib/dbTypes";
import useModalData from "@/shared/providers/ModalContext/ContextHooks/useModalData";

const useSelectedLog = () => {
  const selectedLog = useModalData() as LogEntry | null;

  return selectedLog;
};

export default useSelectedLog;
