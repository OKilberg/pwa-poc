import getAbsenceLabel from "@/features/Logs/Helpers/getAbsenceLabel";
import useSelectedAbsence from "./useSelectedAbsence";

const useDescription = () => {
  const selectedAbsence = useSelectedAbsence();

  if (selectedAbsence) {
    const absenceLabel = getAbsenceLabel(selectedAbsence);

    const description = `${absenceLabel} will be removed and cannot be restored.`;

    return description;
  }

  return "...";
};

export default useDescription;
