"use client";
import { Iproduct } from "../product/page";
import { cartContext } from "@/global/context/page";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { urlFor } from "@/lib/sanityClient";
import LoadingComp from "../components/LoadingComp";
import { useUser } from "@clerk/nextjs";
import getStripePromise from "@/lib/stripe";

const notificationError = (title: string) => {
  toast(title, {
    position: "top-center",
  });
};

const CartComp = ({
  allProductsOfStore,
}: {
  allProductsOfStore: Array<Iproduct>;
}) => {
  const [allProductsForCart, setAllProductsForCart] = useState<any>();
  let { state, userData, apidispatch, quantity, loading, setQuantity } =
    useContext(cartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();

  function PriceSubTotal() {
    let orignalToSend: number = 0;
    allProductsForCart &&
      allProductsForCart.forEach((element: Iproduct) => {
        let subTotalPrice = element.quantity * element.price;
        orignalToSend = orignalToSend + subTotalPrice;
      });

    setTotalPrice(orignalToSend);
    // router.refresh();
  }

  useEffect(() => {
    PriceSubTotal();
  }, [allProductsForCart]);

  function handleRemove(product_id: number) {
    if (userData) {
      let user_id = user?.fullName;
      apidispatch("removeFromCart", { product_id, user_id });
  
      // Find the removed product in the cart array
      let removedProduct = state.cartArray.find((elem: any) => elem.product_id === product_id);
  
      // Update the quantity state by subtracting the quantity of the removed product
      if (removedProduct) {

        setQuantity(quantity - removedProduct.quantity);
      }
    }
  }
  useEffect(() => {
    if (state.cartArray) {
      let data = allProductsOfStore.filter((item: Iproduct) => {
        for (let index = 0; index < state.cartArray.length; index++) {
          let element: any = state.cartArray[index];
          if (
            element.product_id == item.id &&
            element.user_id == user?.fullName
          ) {
            return true;
          }
        }
      });

      let updatedData = data.map((elem: Iproduct) => {
        for (let index = 0; index < state.cartArray.length; index++) {
          let element: any = state.cartArray[index];
          if (element.product_id == elem.id) {
            return {
              ...elem,
              quantity: element.quantity,
            };
          }
        }
      });

      setAllProductsForCart(updatedData);
    }
  }, [state.cartArray]);

  async function handleDecrementByOne(product_id: number, price: number) {
    let stableQuantity: number = 0;
    state.cartArray.forEach((element: any) => {
      if (element.product_id == product_id) {
        stableQuantity = element.quantity;
      }
    });
  
    if (stableQuantity - 1 <= 0) {
      notificationError("Did not accept lower than 1");
    } else {
      await apidispatch("updateCart", {
        product_id: product_id,
        quantity: stableQuantity - 1,
        user_id: user?.fullName,
        price: price,
      });
      notificationError("Decremented by One");
      setQuantity(quantity - 1);
    }
  }
  
  async function handleIncrementByOne(product_id: number, price: number) {
    let stableQuantity: number = 0;
    state.cartArray.forEach((element: any) => {
      if (element.product_id == product_id) {
        stableQuantity = element.quantity;
      }
    });
    let returnedVal = await apidispatch("updateCart", {
      product_id: product_id,
      quantity: stableQuantity + 1,
      user_id: user?.fullName,
      price: price,
    });
    notificationError("Incremented by One");
    setQuantity(quantity + 1);
  }
  const handleProcessCheckout = async () => {
    const stripe = await getStripePromise();
    const response = await fetch("/api/checkout_sessions/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify({ allProductsForCart }),
    });
    const data = await response.json();
    if (data?.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };
  
  return (
    <div className="py-10 px-4 md:px-10">
      <Toaster />

      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col basis-[69%] gap-4">
          {allProductsForCart ? (
            allProductsForCart.map((item: Iproduct) => {
              return (
                <div key={item.id} className=" flex flex-shrink-0 gap-6">
                  <div className="w-[14rem]">
                    <Image
                      className="rounded-xl"
                      width={1000}
                      height={1000}
                      src={urlFor(item.image).width(1000).height(1000).url()}
                      alt="sindhvirsa"
                    />
                  </div>
                  <div className="space-y-1 md:space-y-3 w-full">
                    <div className="flex justify-between">
                      <h2 className="md:text-2xl font-light text-gray-700">
                        {item.name}
                      </h2>
                      {loading ? (
                        <LoadingComp size={"w-10"} />
                      ) : (
                        <div
                          className="cursor-pointer"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash size={28} />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <p className="font-semibold md:text-lg">{item.price}</p>
                      <div
                        className={`flex gap-2 ${
                          loading ? "opacity-25" : "opacity-100"
                        } items-center text-lg`}
                      >
                        <button
                          onClick={() =>
                            handleDecrementByOne(item.id as number, item.price)
                          }
                          className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200"
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() =>
                            handleIncrementByOne(item.id as number, item.price)
                          }
                          disabled={loading}
                          className="border select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full  border-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : !userData ? (
            <div className="text-center font-semibold text-gray-800 text-xl">
              Please login First
            </div>
          ) : (
            arrayForLoading.map((index: number) => (
              <div
                key={index}
                className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto"
              >
                <div className="flex animate-pulse gap-4">
                  <div className="bg-slate-200 rounded-lg h-32 w-4/12"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-8 w-16 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="basis-1/4 space-y-6 px-6">
          <h6 className="font-semibold text-xl">Order Summary</h6>
          <div className="flex justify-between">
            <p className="text-lg font-light">Quantity:</p>
            <p>{quantity} Products</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-light">Subtotal:</p>
            <p>{totalPrice}</p>
          </div>
          <button
            onClick={handleProcessCheckout}
            className="text-white bg-gray-900 border border-gray-500 px-4 py-2 w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartComp;

let arrayForLoading = [1, 2, 3, 4];
