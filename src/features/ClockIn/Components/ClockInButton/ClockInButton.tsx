"use client";
import Button from "@/shared/components/Button/Button";
import useCurrentTime from "@/shared/hooks/useCurrentTime";
import React from "react";
import useOnClick from "./Hooks/useOnClick";
import useVariant from "./Hooks/useVariant";
import useLabel from "./Hooks/useLabel";
import useIcon from "./Hooks/useIcon";

const ClockInButton = () => {
  const variant = useVariant();
  const label = useLabel();
  const Icon = useIcon();

  const currentTime = useCurrentTime();
  const time = currentTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const onClick = useOnClick();

  return (
    <Button
      onClick={onClick}
      variant={variant}
      className="active:brightness-95"
    >
      <Icon className="md:size-[32px]" />
      <div className="flex flex-col justify-center items-start gap-1">
        <p className="leading-none">{label}</p>
        <time className="leading-none font-bold">{time}</time>
      </div>
    </Button>
  );
};

export default ClockInButton;
