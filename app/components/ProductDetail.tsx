"use client";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Iproduct } from "../product/page";
import { FC, useContext, useState } from "react";
import { urlFor } from "@/lib/sanityClient";
import { ShoppingCart } from "lucide-react";
import { cartContext } from "@/global/context/page";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const ProductDetail: FC<{ item: Iproduct }> = ({ item }) => {
  let { cartArray, userData, dispatch, quantity, setQuantity } = useContext(cartContext);
  const [localQuantity, setLocalQuantity] = useState(1);
  const { user } = useUser();
  function handleAddToCart() {
    let isExsits = cartArray.some((elem: any) => elem.product_id === item.id);
  
    if (userData) {
      let dataToAddInCart = {
        product_id: item.id,
        quantity: localQuantity,
        user_id: user?.fullName,
        price: item.price,
      };
      
      if (!isExsits) {
        dispatch("addToCart", dataToAddInCart);
        setQuantity(quantity + localQuantity);
      } else {
        dispatch("updateCart", dataToAddInCart);
        let existingProduct = cartArray.find((elem: any) => elem.product_id === item.id);
        setQuantity(quantity - existingProduct.quantity + localQuantity);
      }
      notification(item.name);
    } else {
      notificationError("Please login first");
    }
  }
   

  function incrementTheQuantity() {
    setLocalQuantity(localQuantity + 1);
  }

  function decrementTheQuantity() {
    if (localQuantity !== 0) {
      setLocalQuantity(localQuantity - 1);
    }
  }

  const notification = (title: string) => {
    toast(` ${localQuantity} ${title} added to Cart`, {
      icon: "",
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
        <div key={item.id} className="flex flex-col md:flex-row flex-1 items-start justify-center">
          <div>
            <Image
              src={urlFor(item.image).url()}
              alt="sindhvirsa"
              height={400}
              width={400}
            ></Image>
          </div>
          <div className="flex-wrap w-full md:w-2/4">
            <div className="text-3xl md:text-6xl font-bold mb-4 mx-4 md:mx-16">{item.name}</div>
            <p className="text-lg text-black italic font-medium mb-4 mx-4 md:mx-16">
              {item.price} Rs
            </p>
            <h2 className="text-xl font-normal mx-4 md:mx-16 mb-4 flex-wrap ">
              {item.description}
            </h2>
            <span className="flex mx-4 md:mx-16 mb-4">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <div className="flex mb-4 text-black items-center gap-x-4 mx-4 md:mx-16">
              <div
                onClick={decrementTheQuantity}
                className="select-none cursor-pointer flex justify-center items-center w-9 h-9 rounded-full bg-gray-200"
              >
                -
              </div>
              <h2 className="text-base font-normal">Quantity:</h2>
              <p>{localQuantity}</p>
              <div
                onClick={incrementTheQuantity}
                className="select-none cursor-pointer flex justify-center items-center w-9 h-9 rounded-full border border-gray-800"
              >
                +
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-x-2 mx-4 md:mx-16">
                {/* Add to Cart Button */}
                <Button
                    onClick={() => handleAddToCart()}
                    className="bg-black text-white hover:scale-105 hover:bg-black"
                >
                    <ShoppingCart />
                    Add to Cart
                </Button>
                {/* Go to Cart Button */}
                <Link href={'/cart'}><Button
                    
                    className="bg-red-400 text-black hover:font-bold shadow-md outline-black"
                    style={{position:'relative'}}
                >
                    Go to Cart
                    {/* Displaying number of products in cart */}
                    {quantity > 0 && 
                        <span style={{position:'absolute', top:'-10px', right:'-10px', backgroundColor:'red', borderRadius:'50%', width:'20px', height:'20px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            {quantity}
                        </span>
                    }
                </Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  ;
};

export default ProductDetail;
