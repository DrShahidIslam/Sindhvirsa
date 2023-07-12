import CartComp from "../components/Cart";

async function fatchAllStoreProducts() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-06/data/query/production?query=*[_type == "product"]`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

const Cart = async () => {
  let allProductsOfStore = await fatchAllStoreProducts();
  
  return (
      <CartComp allProductsOfStore={allProductsOfStore.result} />
  );
};

export default Cart;
