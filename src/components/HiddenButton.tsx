"use client";
import { addLocalUser } from "@/lib/dbLib";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const HiddenButton = ({ children }: Props) => {
  const onClick = async () => {
    await addLocalUser(111, "Oscar", "K");
    await addLocalUser(222, "Sofia", "H");
    alert("Added users");
  };

  return <button onClick={onClick}>{children}</button>;
};

export default HiddenButton;
