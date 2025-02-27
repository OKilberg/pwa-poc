"use client";
import { addUser } from "@/lib/db/users";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const HiddenButton = ({ children }: Props) => {
  const onClick = async () => {
    const user1 = {
      id: 111,
      role: "employee" as const,
      firstName: "John",
      lastName: "K",
    };

    const user2 = {
      id: 222,
      role: "employee" as const,
      firstName: "Alice",
      lastName: "H",
    };

    await addUser(user1);

    await addUser(user2);

    alert("Added users");
  };

  return <button onClick={onClick}>{children}</button>;
};

export default HiddenButton;
