"use client"
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { usePathname } from "next/navigation";

const AppBar = () => {

  const pathName = usePathname();
  const hideAppBar = ["/login"].some(keyword =>
    pathName.includes(keyword)
  );

  return (
    !hideAppBar && 
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard"}
      >
        DashBoard
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/documents"}
      >
        Documents
      </Link>

      <Link
        className="transition-colors hover:text-blue-500"
        href={"/applicants"}
      >
        Applicants
      </Link>

      <SignInButton />
    </header>
  );
};

export default AppBar;