import React from "react";
import { ParentComponent, Styleable } from "../types";
import clsx from "clsx";

type ButtonProps = { variant: "primary" | "secondary" } & ParentComponent &
  Styleable;

const Button = ({ children, className, variant }: ButtonProps) => {
  const isSecondary = variant === "secondary";
  const isPrimary = variant === "primary";

  const classButton = clsx(
    "flex justify-center items-center py-6 w-[496px] gap-2 rounded-2xl text-[24px]",
    className,
    isSecondary && "border-2 border-black",
    isPrimary && "bg-success text-white"
  );

  return <button className={classButton}>{children}</button>;
};

export default Button;
