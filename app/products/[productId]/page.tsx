// pages/products/[productId].tsx
import { GetServerSideProps } from "next";
import Image from "next/image";
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  active: boolean;
};
const products = [
  {
    id: "1",
    name: "Example Product 1",
    description: "This is an example product.",
    price: 9.99,
    image: "/example-product-1.jpg",
    active: true,
  },
  {
    id: "2",
    name: "Example Product 2",
    description: "This is another example product.",
    price: 19.99,
    image: "/example-product-2.jpg",
    active: true,
  },
  {
    id: "3",
    name: "Example Product 3",
    description: "This is another example product.",
    price: 19.99,
    image: "/example-product-3.jpg",
    active: true,
  },
  {
    id: "4",
    name: "Example Product 4",
    description: "This is another example product.",
    price: 19.99,
    image: "/example-product-4.jpg",
    active: true,
  },
];

type ProductPageProps = {
  productId: string;
};


const ProductPage = ({ productId }: ProductPageProps) => {
  const product = products.find((product) => (productId) === product.id && product.active);


  if (!product) {
    return <p>Product not found.</p>;
  }
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-extrabold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <p className="text-xl font-bold mb-6">${product.price}</p>
          <div className="flex space-x-4">
            <button
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-white text-black px-6 py-2 rounded-lg border border-black hover:bg-gray-100"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.params?.productId;

  return {
    props: {
      productId,
    },
  };
};
export default ProductPage;
