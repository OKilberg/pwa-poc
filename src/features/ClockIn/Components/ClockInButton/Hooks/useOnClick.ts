import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import getNewCheckInEntry from "../Helpers/getNewCheckInEntry";
import { addLogEntry, editLogEntry } from "@/lib/db/logs";
import useLogout from "@/shared/context/UserSessionContext.tsx/ContextHooks/useLogout";
import toast from "react-hot-toast";
import { getISOTime } from "@/util/util";

const useOnClick = () => {
  const user = useUser();
  const logout = useLogout();

  const onClick = async () => {
    if (user) {
      const { id, isClockedIn, firstName } = user;

      if (isClockedIn) {
        const entryEdits = {
          outTime: new Date().toISOString(),
        };

        const { entryId } = user;

        console.log("Should Edit", entryEdits, entryId);

        await editLogEntry(entryId, entryEdits);

        const clockedOutMessage = `${firstName} clocked out at ${getISOTime(
          entryEdits.outTime
        )}`;

        toast.success(clockedOutMessage, { icon: "👋", className: "text-xl" });

        return logout();
      }

      const newCheckInEntry = getNewCheckInEntry(id);

      await addLogEntry(newCheckInEntry);

      const clockedInMessage = `${firstName} clocked in at ${getISOTime(
        newCheckInEntry.inTime
      )}`;

      toast.success(clockedInMessage, { icon: "💼", className: "text-xl" });

      return logout();
    }

    console.log("Could not clock in: No active user session.");
  };

  return onClick;
};

export default useOnClick;
