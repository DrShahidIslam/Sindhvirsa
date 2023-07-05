import React from "react";
// import Search from "./Search";

import { SignedIn, SignInButton, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import CartButtonWithData from "./CartbuttonwithData";

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

      <div className="flex gap-4 ">
        <SignedIn>
          <div className="">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="">
            <SignInButton>
              <button className="rounded border border-gray-300 py-2 px-4 ">Sign In</button>
            </SignInButton>
          </div>
          <div className="">
            <SignUpButton>
              <button className="rounded border border-gray-300 py-2 px-4 ">Sign Up</button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
      <div>
        <CartButtonWithData />
      </div>
    </div>
  );
}

export default Header;
