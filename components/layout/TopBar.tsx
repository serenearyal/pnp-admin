"use client";
import Image from "next/image";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { navLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src="/favicon.ico" alt="logo" width={70} height={20} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname == link.url ? "text-blue-1" : ""
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="realtive flex gap-4 text-body-medium items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        />
        {dropDownMenu && (
          <div
            className=" absolute top-20 right-20
           flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg"
          >
            <Image src="/favicon.ico" alt="logo" width={100} height={20} />

            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className={`flex gap-4 text-body-medium ${
                  pathname == link.url ? "text-blue-1" : ""
                }`}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
