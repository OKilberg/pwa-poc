import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import getNewCheckInEntry from "../Helpers/getNewCheckInEntry";
import { addLogEntry, editLogEntry } from "@/lib/db/logs";
import useLogout from "@/shared/context/UserSessionContext.tsx/ContextHooks/useLogout";
import toast from "react-hot-toast";
import { getISOTime } from "@/util/util";
import dayjs from "dayjs";
import { promiseCache } from "@/shared/hooks/useQuery";
import {
  clearLogsCacheKey,
  clearUserLogsCache,
} from "@/lib/queryCache/queryCache";

const useOnClick = () => {
  const user = useUser();
  const logout = useLogout();

  const clearCache = (
    userId: number,
    dateFormatted: string,
    isoDate: string
  ) => {
    promiseCache.delete("clockedIn");
    clearLogsCacheKey(dateFormatted);
    clearUserLogsCache(userId, isoDate);
  };

  const onClick = async () => {
    if (user) {
      const { id, isClockedIn, firstName } = user;

      // IF CLOCKED IN, CLOCK OUT
      if (isClockedIn) {
        const clockedOutDate = dayjs();
        const clockedOutIsoString = clockedOutDate.toISOString();

        const entryEdits = {
          outTime: clockedOutIsoString,
        };

        const { entryId } = user;

        await editLogEntry(entryId, entryEdits);

        const dateFormatted = dayjs().format("YYYY-MM-DD");
        clearCache(id, dateFormatted, clockedOutIsoString);

        const clockedOutMessage = `${firstName} clocked out at ${getISOTime(
          entryEdits.outTime
        )}`;

        toast.success(clockedOutMessage, {
          icon: "👋",
          className: "md:text-xl",
        });

        return logout();
      }

      // IF NOT CLOCKED IN, CLOCK IN
      const newCheckInEntry = getNewCheckInEntry(id);

      await addLogEntry(newCheckInEntry);
      promiseCache.delete("clockedIn"); // clear clocked in cache
      promiseCache.delete(`att-${id}-${newCheckInEntry.year}`); // clear attendance cache for the user and year

      const dateFormatted = dayjs().format("YYYY-MM-DD");
      clearCache(
        id,
        dateFormatted,
        dayjs(newCheckInEntry.inTime).toISOString()
      );

      const clockedInMessage = `${firstName} clocked in at ${getISOTime(
        newCheckInEntry.inTime
      )}`;

      toast.success(clockedInMessage, { icon: "💼", className: "md:text-xl" });

      return logout();
    }
  };

  return onClick;
};

export default useOnClick;
