"use client";

import React, { createContext, useId } from "react";
import { AccordionGroupProps } from "./types";

export const AccordionContext = createContext<string>("default");

export const AccordionGroup: React.FC<AccordionGroupProps> = ({ children }) => {
  const name = useId();
  return (
    <AccordionContext.Provider value={name}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
};
