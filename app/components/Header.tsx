"use client";
import React, { useState, useContext} from "react";
import { SignedIn, SignInButton, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Cart from "./Cartbutton";
import ContextWrapper from "@/global/context/page";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cartContext } from "@/global/context/page";

function Header() {
  const{quantity} = useContext(cartContext)
  const router = useRouter();
  const User = <UserButton afterSignOutUrl="/" />;
  const [searchQuery, setSearchQuery] = useState("");

  function handleSerachCalledFunc(e: any) {
    if (e.key === "Enter" && e.keyCode === 13) {
      router.push(`/search/${searchQuery}`);
    }
  }

  return (
    <ContextWrapper>
  <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-16 my-3 gap-6">
    <div>
      <Link
        href={"/"}
        className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight lg:text-5xl"
      >
        SINDHVIRSA
      </Link>
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
        className="focus:outline-none pl-1 pr-5 py-1 w-full md:w-80 rounded-r-md"
        placeholder="Search in Our Store"
      />
    </div>
    <div className="flex flex-col md:flex-row gap-4 ">
      <SignedIn>
        <div className="">
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="">
          <SignInButton>
            <button className="rounded border border-gray-300 py-2 px-4 ">
              Sign In
            </button>
          </SignInButton>
        </div>
        <div className="">
          <SignUpButton>
            <button className="rounded border border-gray-300 py-2 px-4 ">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
    <Link href={"/cart"}>
      <Cart/>
    </Link>
  </div>
</ContextWrapper>
  );
}

export default Header;
