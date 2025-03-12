import useUser from "@/shared/context/UserSessionContext.tsx/ContextHooks/useUser";
import { CirclePlay, CircleStop, TriangleAlert } from "lucide-react";

const useIcon = () => {
  const user = useUser();

  if (user) {
    const { isClockedIn } = user;

    const icon = isClockedIn ? CircleStop : CirclePlay;

    return icon;
  }

  const icon = TriangleAlert;

  return icon;
};

export default useIcon;
