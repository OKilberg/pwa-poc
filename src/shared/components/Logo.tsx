import React from "react";
import { Styleable } from "./types";
import clsx from "clsx";

type LogoProps = Styleable;

const Logo = ({ className, style }: LogoProps) => {
  const classLogo = clsx("font-carterOne text-tresLogo", className);
  return (
    <div style={style} className={classLogo}>
      TRES AMIGOS
    </div>
  );
};

export default Logo;
