"use client";
import { addUser } from "@/lib/db/users";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const HiddenButton = ({ children }: Props) => {
  const onClick = async () => {
    const admin = {
      id: 333,
      role: "admin" as const,
      firstName: "Adam",
      lastName: "N",
      idn: "1337",
      state: "active" as const,
    };

    await addUser(admin);

    alert("Added users");
  };

  return <button onClick={onClick}>{children}</button>;
};

export default HiddenButton;
