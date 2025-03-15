import { useContext as useReactContext } from "react";
import { ReportsContext } from "../ReportsContext";

const useContext = () => {
  const context = useReactContext(ReportsContext);

  if (!context) {
    throw new Error("ReportsContext could not be found.");
  }

  return context;
};

export default useContext;
