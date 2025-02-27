import { Menu, NotebookText, TableProperties } from "lucide-react";
import React from "react";
import HiddenButton from "../HiddenButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar text-tresLight font-publicSans px-0">
      <div className="flex-1">
        <Link href="/" className="">
          <Menu />
        </Link>
      </div>
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
        <Link className="" href="/entries">
          <TableProperties />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
