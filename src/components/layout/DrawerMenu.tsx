"use client";

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { Home, NotebookText, ShieldUser, TableProperties } from "lucide-react";
import HiddenButton from "../HiddenButton";
import Link from "next/link";

type Props = { children: ReactNode };

const DrawerMenu = ({ children }: Props) => {
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById(
      "my-drawer-2"
    ) as HTMLInputElement;

    if (!drawerCheckbox) {
      return;
    }

    drawerCheckbox.checked = false;
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Page content here */}
        <Navbar />
        <main className="px-3 lg:pt-16">{children}</main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <HiddenButton>
            <div className="flex-1 flex-col">
              <p className="font-carterOne text-tresContrastYellow text-base">
                TRES AMIGOS
              </p>
              <p className="flex justify-center items-center text-xl gap-1 font-bold">
                <NotebookText height={20} width={20} />
                WorkLog
              </p>
            </div>
          </HiddenButton>
          <br />
          <li>
            <Link
              onClick={closeDrawer}
              className="flex items-center gap-2"
              href="/"
            >
              <Home />
              Home
            </Link>
          </li>

          <li>
            <Link
              onClick={closeDrawer}
              className="flex items-center gap-2"
              href="/entries"
            >
              <TableProperties />
              Log
            </Link>
          </li>
          <li className="">
            <Link onClick={closeDrawer} className="" href="/admin">
              <ShieldUser />
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerMenu;
