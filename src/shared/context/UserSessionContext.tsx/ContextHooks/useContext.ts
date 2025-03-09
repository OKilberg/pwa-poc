import { useContext as useReactContext } from "react";
import { UserSessionContext } from "../UserSessionProvider";

const useContext = () => {
  const context = useReactContext(UserSessionContext);

  if (!context) {
    throw new Error("UserSessionContext could not be found.");
  }

  return context;
};

export default useContext;
