"use client";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Iproduct } from "../product/page";
import { FC, useContext, useState } from "react";
import { client } from "@/lib/sanityClient";
import { urlFor } from "@/lib/sanityClient";
import { Trash } from "lucide-react";
import { cartContext } from "@/global/context/page";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

const ProductDetail: FC<{ item: Iproduct }> = ({ item }) => {
  let { cartArray, userData, dispatch } = useContext(cartContext);
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    let isExsits = cartArray.some((elem: any) => elem.product_id === item.id);

    if (userData) {
      let dataToAddInCart = {
        product_id: item.id,
        quantity: quantity,
        user_id: userData.uuid,
        price: item.price,
      };
      if (!isExsits) {
        dispatch("addToCart", dataToAddInCart);
      } else {
        dispatch("updateCart", dataToAddInCart);
      }
      notification(item.name);
    } else {
      notificationError("Please login first");
    }
  }

  function incrementTheQuantity() {
    setQuantity(quantity + 1);
  }

  function decrementTheQuantity() {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  }

  const notification = (title: string) => {
    toast(` ${quantity} ${title} added to Cart`, {
      icon: "👏",
      position: "top-center",
    });
  };

  const notificationError = (title: string) => {
    toast(title, {
      position: "top-center",
    });
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center h-auto max-w-screen-2xl mt-16">
        <div key={item.id} className="flex flex-1 items-start justify-center">
          <div>
            <Image
              width={500}
              height={400}
              src={urlFor(item.image).url()}
              alt="sindhvirsa"
            ></Image>
          </div>
          <div className="flex-wrap w-2/4">
            <div className="text-6xl font-bold mb-4 m-16">{item.name}</div>
            <p className="text-lg text-black italic font-medium mb-4 mx-16">
              {item.price} Rs
            </p>
            <h2 className="text-xl font-normal mx-16 mb-4 flex-wrap ">
              {item.description}
            </h2>
            <span className="flex mx-16 mb-4">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <div className="flex mb-4 text-black items-center gap-x-4 mx-16">
              <div
                onClick={decrementTheQuantity}
                className="select-none cursor-pointer flex justify-center items-center w-9 h-9 rounded-full bg-gray-200"
              >
                -
              </div>
              <h2 className="text-base font-normal">Quantity:</h2>
              <p>{quantity}</p>
              <div
                onClick={incrementTheQuantity}
                className="select-none cursor-pointer flex justify-center items-center w-9 h-9 rounded-full border border-gray-800"
              >
                +
              </div>
            </div>
          </div>
          <Button
            onClick={() => handleAddToCart()}
            className="bg-black text-white mx-16 hover:scale-105 hover:bg-black"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
