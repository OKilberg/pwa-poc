import useSelectedLog from "./useSelectedLog";

const useLabel = () => {
  const selectedLog = useSelectedLog();

  if (selectedLog) {
    const label = `Are you sure you want to delete Log #${selectedLog.id}?`;

    return label;
  }

  return "No log selected.";
};

export default useLabel;
