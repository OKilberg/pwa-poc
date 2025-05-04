"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type MenuItemProps = {
  label: string;
  description: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick?: () => void;
  linkTo: string;
};

const MenuItem = ({
  description,
  label,
  leadingIcon,
  trailingIcon,
  onClick,
  linkTo,
}: MenuItemProps) => {
  const { push } = useRouter();

  const _onClick = linkTo ? () => push(linkTo) : onClick;

  return (
    <button
      className="flex w-full gap-4 px-4 py-3 border border-gray-600 rounded-md"
      onClick={_onClick}
    >
      {leadingIcon}
      <div className="text-left">
        <p className="text-xl">{label}</p>
        <p className="text-lg text-gray-700">{description}</p>
      </div>
      <div className="ml-auto">{trailingIcon}</div>
    </button>
  );
};

export default MenuItem;
