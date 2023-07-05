"use client";
import React from "react";
import { Button } from "./ui/button";
import { FC } from "react";

const AddtoCart: FC<{ item: any }> = ({ item }) => {
  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: item.id,
      }),
    });
    const result = await res.json();
    console.log(result);
    window.dispatchEvent(new Event("cartChanged"));
  };

  return (
    <div>
      <Button
        onClick={handleAddToCart}
        className="bg-black text-white mx-16 hover:scale-105 hover:bg-black"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddtoCart;
