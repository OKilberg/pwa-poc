"use client";

import React from "react";
import AppBarIconAction from "./AppBarIconAction";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type AppBarBackProps = {
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
      <ArrowLeft />
    </AppBarIconAction>
  );
};

export default AppBarBack;
