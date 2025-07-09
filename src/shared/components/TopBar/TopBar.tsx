"use client";

import clsx from "clsx";
import React from "react";
import { ParentComponent, Styleable } from "../types";
import useShowTopbar from "./Hooks/useShowTopbar";

type TopBarProps = ParentComponent & Styleable;

const TopBar = ({ children, className }: TopBarProps) => {
  const classTopBar = clsx(
    "h-12 md:h-20 flex items-center min-h-12 md:min-h-20 w-full",
    className
  );

  const showTopbar = useShowTopbar();

  if (showTopbar) return <nav className={classTopBar}>{children}</nav>;
};

export default TopBar;
