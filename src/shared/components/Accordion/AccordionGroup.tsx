"use client";

import React, { createContext } from "react";
import { AccordionGroupProps } from "./types";

export const AccordionContext = createContext<string>("default");

export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  name,
  children,
}) => {
  return (
    <AccordionContext.Provider value={name}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
};
