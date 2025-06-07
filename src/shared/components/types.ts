import { ReactNode } from "react";

export type Styleable = {
  className?: string;
  style?: object;
};

export type ParentComponent = {
  children?: ReactNode;
};

const sizes = ["w-fit", "w-full"] as const;

type Sizes = (typeof sizes)[number];

export type Sizeable = {
  w?: Sizes | (string & {});
  h?: string;
};

export type Clickable = {
  onClick?: () => void;
};
