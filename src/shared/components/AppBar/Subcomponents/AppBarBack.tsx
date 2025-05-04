"use client";

import React from "react";
import AppBarIconAction from "./AppBarIconAction";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AppBarBack = () => {
  const { back } = useRouter();

  return (
    <AppBarIconAction onClick={back}>
      <ArrowLeft />
    </AppBarIconAction>
  );
};

export default AppBarBack;
