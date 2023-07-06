"use client"
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { cartContext } from '@/global/context/page'; 
import { useContext } from "react"

const Cartstate = () => {
    let { cartArray,quantity } = useContext(cartContext);
  return (
    <div className="relative">
      <button>
        <ShoppingCart/>
      </button>
        <div className="absolute -top-1 -right-2 rounded-full bg-black text-white w-4 h-4 flex items-center justify-center">
          {quantity}
        </div>
    </div>
  );
};

export default Cartstate;