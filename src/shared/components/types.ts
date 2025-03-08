import { ReactNode } from "react";

export type Styleable = {
  className?: string;
  style?: object
};

export type ParentComponent = {
  children?: ReactNode;
};
