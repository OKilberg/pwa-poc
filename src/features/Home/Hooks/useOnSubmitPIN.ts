import { getUser } from "@/lib/db/users";
import getCode from "../Helpers/getCode";
import { getActiveLogEntry } from "@/lib/db/logs";
import { startUserSession } from "@/lib/session/Session";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useOnSubmitPIN = () => {
  const { push } = useRouter();
  const onSubmitPIN = async (_prevData: unknown, formData: FormData) => {
    const code = getCode(formData);
    const user = await getUser(code);

    if (user) {
      const { id, role } = user;
      const activeLogEntry = await getActiveLogEntry(id);

      const isClockedIn = !!activeLogEntry;
      if (isClockedIn) {
        const { inTime, id } = activeLogEntry;

        startUserSession({ ...user, isClockedIn, inTime, entryId: id });
      } else {
        startUserSession({ ...user, isClockedIn });
      }

      if (role === "admin") {
        return push("/admin");
      }
      return push("/clockin");
    }

    toast.error("Invalid PIN, try again", { duration: 1500 });
    return undefined;
  };

  return onSubmitPIN;
};

export default useOnSubmitPIN;
