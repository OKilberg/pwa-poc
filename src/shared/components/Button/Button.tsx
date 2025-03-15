import React from "react";
import { Clickable, ParentComponent, Styleable } from "../types";
import clsx from "clsx";

type ButtonProps = {
  variant: "primary" | "secondary" | "tertiary" | "positive" | "negative";
  state?: "active" | "disabled";
  type?: "submit";
} & ParentComponent &
  Styleable &
  Clickable;

const Button = ({
  children,
  className,
  variant,
  state,
  type,
  onClick,
}: ButtonProps) => {
  const isSecondary = variant === "secondary";
  const isPrimary = variant === "primary";
  const isTertiary = variant === "tertiary";
  const isPositive = variant === "positive";
  const isNegative = variant === "negative";
  const isDisabled = state === "disabled";

  const buttonType = type ? type : "button";

  const classButton = clsx(
    "flex justify-center items-center py-6 w-[496px] gap-2 rounded-2xl text-[24px]",
    className,
    isSecondary && "border-2 border-black",
    isPrimary && "bg-success text-white",
    isTertiary && "",
    isPositive && "bg-success text-white",
    isNegative && "bg-danger text-white",
    isDisabled && "opacity-25"
  );

  return (
    <button
      onClick={onClick}
      type={buttonType}
      disabled={isDisabled}
      className={classButton}
    >
      {children}
    </button>
  );
};

export default Button;
