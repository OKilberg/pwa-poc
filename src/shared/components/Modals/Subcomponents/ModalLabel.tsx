import React from "react";
import { ParentComponent } from "../../types";

const ModalLabel = ({ children }: ParentComponent) => {
  return <h3 className="font-bold text-lg">{children}</h3>;
};

export default ModalLabel;
