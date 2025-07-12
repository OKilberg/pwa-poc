"use client";

import React from "react";
import AppBarIconAction from "./AppBarIconAction";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export type AppBarBackProps = {
  url?: string;
};

const AppBarBack = ({ url }: AppBarBackProps) => {
  const { back, push } = useRouter();

  const onClick = url
    ? () => {
        push(url);
      }
    : back;

  return (
    <AppBarIconAction onClick={onClick}>
      <ArrowLeft className="size-5 md:size-6" />
    </AppBarIconAction>
  );
};

export default AppBarBack;
