import React from "react";
import Search from "./Search";
import DropdownButton from "./Dropdown";

function Header() {
  return (
    <div className="flex justify-between mx-16 my-3 gap-6">
      <h1 className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight lg:text-5xl">
        SINDHVIRSA
      </h1>
      <div className="flex gap-28 md:gap-96">
        <Search />
        <DropdownButton/>
      </div>
    </div>
  );
}

export default Header;
