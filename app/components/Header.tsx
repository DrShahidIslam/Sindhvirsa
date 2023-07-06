"use client";
import React, { useState } from "react";
import { SignIn, SignUp, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Cartstate from "./Cartbutton";
import ContextWrapper from "@/global/context/page";
import { useRouter } from "next/navigation";
import router from "next/router";
import { Search } from "lucide-react";

function Header() {
  const User = <UserButton afterSignOutUrl="/" />;
  const [searchQuery, setSearchQuery] = useState("");

  function handleSerachCalledFunc(e: any) {
    if (e.key === "Enter" && e.keyCode === 13) {
      router.push(`/search/${searchQuery}`);
    }
  }

  return (
    <ContextWrapper>
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
          <div>
            <SignIn />
          </div>
          <div>
            <SignUp />
          </div>
          <div>
            <UserButton />
          </div>
        </div>
        <div className="border flex items-center bg-white text-gray-600 pl-3 rounded-md">
          <Link href={`/search/${searchQuery}`}>
            <Search />
          </Link>
          <input
            type="text"
            value={searchQuery}
            onKeyDown={handleSerachCalledFunc}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:outline-none pl-1 pr-5 py-1 w-80 rounded-r-md"
            placeholder="Search in Our Store"
          />
        </div>
        <Link href={"/cart"}>
          <Cartstate />
        </Link>
      </div>
    </ContextWrapper>
  );
}

export default Header;
