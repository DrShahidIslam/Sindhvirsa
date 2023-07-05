"use client";
import { useState } from "react";

import React from "react";

const IncreDecreButton = () => {
  const [num, setNum] = useState(0);
 

  return (
    <div>
      <button
        className="hover:text-black shadow-xl text-slate-600 hover:scale-110"
        onClick={() => setNum(num <= 0 ? 0 : num - 1)} >
        <span className="shadow-xl text-lg items-center rounded-full">-</span>
      </button>
      <span className="text-lg items-center mx-2">{num}</span>
      <button className="shadow-xl text-slate-600 hover:text-black hover:scale-110" onClick={() => setNum(num + 1)}>
        <span className="shadow-xl text-lg items-center rounded-full">+</span>
      </button>
    </div>
  );
};

export default IncreDecreButton;
