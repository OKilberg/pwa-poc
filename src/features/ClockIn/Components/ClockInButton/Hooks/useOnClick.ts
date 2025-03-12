import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import getNewCheckInEntry from "../Helpers/getNewCheckInEntry";
import { addLogEntry, editLogEntry } from "@/lib/db/logs";
import useLogout from "@/shared/context/UserSessionContext.tsx/ContextHooks/useLogout";

const useOnClick = () => {
  const user = useUser();
  const logout = useLogout();

  const onClick = async () => {
    if (user) {
      const { id, isClockedIn } = user;

      if (isClockedIn) {
        const entryEdits = {
          outTime: new Date().toISOString(),
        };

        const { entryId } = user;

        console.log("Should Edit", entryEdits, entryId);

        await editLogEntry(entryId, entryEdits);

        return logout();
      }

      const newCheckInEntry = getNewCheckInEntry(id);

      await addLogEntry(newCheckInEntry);
      return logout();
    }

    console.log("Could not clock in: No active user session.");
  };

  return onClick;
};

export default useOnClick;
