"use client"
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export const cartContext = createContext<any>("");

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  let router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [cartArray, setCartArray] = useState<any>([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cartArray.length !== 0) {
      setQuantity(cartArray.reduce((acc: number, item: any) => acc + item.quantity, 0));
    }
  }, [cartArray]);
  

  async function fetchApiForAllCartItems() {
    if (userData) {
      let res = await fetch(`/api/cart?user_id=${user?.fullName}`);
      if (!res.ok) {
        throw new Error("Failed to Fetch");
      }
      let dataToreturn = await res.json();
      await setCartArray((prev: any) => dataToreturn.allCartData);
      router.refresh();
      if (dataToreturn) {
        return true;
      }
    }
  }

  useEffect(() => {
    fetchApiForAllCartItems();
  }, [userData]);

  async function dispatch(payload: string, data: any) {
    if (payload === "addToCart") {
      console.log("func running of add to cart");
      await fetch(`/api/cart`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } else if (payload === "removeFromCart") {
      let dataa = await fetch(
        `/api/cart?product_id=${data.product_id}&user_id=${data.user_id}`,
        {
          method: "DELETE",
        }
      );
      let NotData = await dataa.json();
    } else if (payload === "updateCart") {
      setLoading(true);
      let dataa = await fetch(`/api/cart`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      let NotData = await dataa.json();
      setLoading(false);
    }
    let resp = await fetchApiForAllCartItems();
    if (resp) {
      return "Sucess";
    } else {
      return "Not Sucessful";
    }
  }
  useEffect(() => {
    if (user) {
      setUserData({
        displayUserName: user?.fullName,
      });
    } else {
      setUserData(null);
    }
  }, []);
    
  return (
    <cartContext.Provider
      value={{
        cartArray,
        dispatch,
        userData,
        loading,
        quantity,
        setQuantity,
        setUserData,
        setCartArray,
        setLoading

      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export default ContextWrapper;
