"use client";
import Button from "@/shared/components/Button/Button";
import useCurrentTime from "@/shared/hooks/useCurrentTime";
import { CirclePlay } from "lucide-react";
import React from "react";

const ClockInButton = () => {
  const currentTime = useCurrentTime();
  const time = currentTime.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Button variant="primary" className="h-[88px] active:brightness-95">
      <CirclePlay size={32} />
      <div className="flex flex-col justify-center items-start">
        <p className="text-[24px]">Clock in</p>
        <time className="text-[24px] font-bold">{time}</time>
      </div>
    </Button>
  );
};

export default ClockInButton;
