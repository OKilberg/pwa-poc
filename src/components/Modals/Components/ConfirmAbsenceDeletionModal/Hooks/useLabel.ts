import useSelectedAbsence from "./useSelectedAbsence";

const useLabel = () => {
  const selectedAbsence = useSelectedAbsence();

  if (selectedAbsence) {
    const label = `Are you sure you want to delete Absence #${selectedAbsence.id}?`;

    return label;
  }

  return "No absence selected.";
};

export default useLabel;
