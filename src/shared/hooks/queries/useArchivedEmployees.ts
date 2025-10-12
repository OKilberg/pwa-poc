import { getArchivedEmployees } from "@/lib/db/users";
import { User } from "@/lib/dbTypes";
import { useLiveQuery } from "dexie-react-hooks";

const useArchivedEmployees = () => {
  const archivedEmployees = useLiveQuery(
    () => getArchivedEmployees(),
    [],
    [] as User[]
  );

  return archivedEmployees;
};

export default useArchivedEmployees;
