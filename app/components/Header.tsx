import React from "react";
// import Search from "./Search";

import { SignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import CartButtonWithData from "./CartbuttonwithData";

const User = <UserButton afterSignOutUrl="/" />;
function Header() {
  return (
    <div className="flex justify-between mx-16 my-3 gap-6">
      <div>
        <Link
          href={"/"}
          className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight lg:text-5xl"
        >
          SINDHVIRSA
        </Link>
      </div>

      <div>
        <SignIn/>
      </div>
      <div>
        <CartButtonWithData />
      </div>
    </div>
  );
}

export default Header;
