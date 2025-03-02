import { Kanban, Menu, NotebookText, TableProperties } from "lucide-react";
import React from "react";
import HiddenButton from "../HiddenButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar text-tresLight font-publicSans px-3 lg:hidden">
      <label htmlFor="my-drawer-2" className="drawer-button flex-1">
        <Kanban transform="rotate(-90)" />
      </label>
      <HiddenButton>
        <div className="flex-1 flex-col">
          <p className="font-carterOne text-tresYellow text-base">
            TRES AMIGOS
          </p>
          <p className="flex justify-center items-center text-xl gap-1 font-bold">
            <NotebookText height={20} width={20} />
            WorkLog
          </p>
        </div>
      </HiddenButton>
      <div className="flex-1 flex-row-reverse">
        
      </div>
    </nav>
  );
};

export default Navbar;
