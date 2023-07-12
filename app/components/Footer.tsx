"use client"
import Image from "next/image";
import React from "react";
import logo from "../../public/sindhvirsa logo transparent.png"

const Footer = () => {
 
  return (
    <div className="bg-black h-50 flex justify-around">
              <div>
          <Image src={logo} alt={"sindhvirsa"} height={100} width={200}></Image>
          
      
      </div>
      <ul className="m-4 font-semibold text-lg text-white">
        <li className="m-4">Checkout</li>
        <li className="m-4">My Account</li>
        <li className="m-4">Store</li>
      </ul>
      <ul className="font-semibold m-4 text-lg text-white">
        <li className="m-4">Privacy Policy</li>
        <li className="m-4">Terms and Conditions</li>
        <li className="m-4"></li>
      </ul>
    </div>
  );
};
export default Footer;
