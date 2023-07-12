import { Iproduct } from "../page";
import { getProductData } from "../page";
import ProductDetail from "@/app/components/ProductDetail";

const product: Iproduct[] = await getProductData();

const productdetail = (id: number) => {
  return product.filter((product) => product.id == id);
};
function Product({ params }: { params: { slug: number } }) {
  const result = productdetail(params.slug);
  
  return (
      <ProductDetail item={result[0]} />
  );
};
export default Product