import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import getNewCheckInEntry from "../Helpers/getNewCheckInEntry";
import { addLogEntry, editLogEntry } from "@/lib/db/logs";
import useLogout from "@/shared/context/UserSessionContext.tsx/ContextHooks/useLogout";
import toast from "react-hot-toast";
import { getISOTime } from "@/util/util";
import { promiseCache } from "@/features/Home/Components/useQuery";
import dayjs from "dayjs";

const useOnClick = () => {
  const user = useUser();
  const logout = useLogout();

  const onClick = async () => {
    if (user) {
      const { id, isClockedIn, firstName } = user;

      // IF CLOCKED IN, CLOCK OUT
      if (isClockedIn) {
        const clockedOutDate = new Date();

        const entryEdits = {
          outTime: clockedOutDate.toISOString(),
        };

        const { entryId } = user;

        await editLogEntry(entryId, entryEdits);
        promiseCache.delete("clockedIn");
        promiseCache.delete(`att-${id}-${clockedOutDate.getFullYear()}`);

        const dateFormatted = dayjs().format("YYYY-MM-DD");
        const calendarDatesKey = String(`date-${dateFormatted}`);
        promiseCache.delete(calendarDatesKey);

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
      const calendarDatesKey = String(`date-${dateFormatted}`);
      promiseCache.delete(calendarDatesKey);

      const clockedInMessage = `${firstName} clocked in at ${getISOTime(
        newCheckInEntry.inTime
      )}`;

      toast.success(clockedInMessage, { icon: "💼", className: "md:text-xl" });

      return logout();
    }

    console.log("Could not clock in: No active user session.");
  };

  return onClick;
};

export default useOnClick;
