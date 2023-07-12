"use client";
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cartReducer } from "../reducer/page";

export const cartContext = createContext<any>(null);

const initialState = {
  cart: [],
  cartArray: [],
};

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  let router = useRouter();
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(
      state.cart.reduce((acc: number, item: any) => acc + item.quantity, 0)
    );
  }, [state.cart]);

  async function fetchApiForAllCartItems() {
    if (userData) {
      let res = await fetch(`/api/cart?user_id=${user?.fullName}`);
      if (!res.ok) {
        throw new Error("Failed to Fetch");
      }
      let dataToreturn = await res.json();
      dispatch({ payload: "updateCartArray", data: dataToreturn.allCartData });
      router.refresh();
      if (dataToreturn) {
        return true;
      }
    }
  }
  useEffect(() => {
    fetchApiForAllCartItems();
  }, [userData]);

  async function apidispatch(payload: string, data: any) {
    if (payload === "addToCart") {
      console.log("func running of add to cart");
      await fetch(`/api/cart`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } else if (payload === "removeFromCart") {
      dispatch({ payload: "removeFromCart", data });

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
  }, [user]);

  return (
    <cartContext.Provider
      value={{
        state,
        apidispatch,
        userData,
        loading,
        quantity,
        setQuantity,
        setUserData,
        setLoading,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export default ContextWrapper;
