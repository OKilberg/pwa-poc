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
      className="h-[88px] active:brightness-95"
    >
      <Icon size={32} />
      <div className="flex flex-col justify-center items-start gap-1">
        <p className="text-[24px] leading-none">{label}</p>
        <time className="text-[24px] leading-none font-bold">{time}</time>
      </div>
    </Button>
  );
};

export default ClockInButton;
