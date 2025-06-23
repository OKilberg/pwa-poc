import React from "react";
import { ParentComponent } from "../../types";

const ModalDescription = ({ children }: ParentComponent) => {
  return <p className="py-4">{children}</p>;
};

export default ModalDescription;
