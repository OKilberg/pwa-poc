import React from "react";
import useLabel from "../Hooks/useLabel";

const Label = () => {
  const label = useLabel();
  return <p className="text-[24px]">{label}</p>;
};

export default Label;
