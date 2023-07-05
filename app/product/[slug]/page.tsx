import { urlForImage } from "@/sanity/lib/image";
import { Iproduct } from "../page";
import Image from "next/image";
import { Star } from "lucide-react";
import { getProductData } from "../page";
import IncreDecreButton from "@/app/components/IncreDecreButton";
import AddtoCart from "@/app/components/AddtoCart";


const product: Iproduct[] = await getProductData();

const productdetail = (id: number) => {
  return product.filter((product) => product.id == id);
};

export default function Page({ params }: { params: { slug: number } }) {
  const result = productdetail(params.slug);
 
  return (
    <div className="flex justify-center h-auto max-w-screen-2xl mt-16">
      {result.length > 0 ? (
        result.map((product) => (
          <div
            key={product.id}
            className="flex flex-1 items-start justify-center">
            <div>
              <Image
                width={500}
                height={400}
                src={urlForImage(product.image).url()}
                alt="sindhvirsa"
              ></Image>
            </div>
            <div className="flex-wrap w-2/4">
              <div className="text-6xl font-bold mb-4 m-16">
                {product.name}
              </div>
              <p className="text-lg text-black italic font-medium mb-4 mx-16">
                {product.price} Rs              
              </p>
              <h2 className="text-xl font-normal mx-16 mb-4 flex-wrap ">
                {product.description}
              </h2>
              <span className="flex mx-16 mb-4">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </span>
              <div className="flex mb-4 text-black items-center gap-x-4 mx-16">
                <h2 className="text-base font-normal">Quantity:</h2>
              <IncreDecreButton/>
              </div>
              <AddtoCart item={product}/>
            </div>
            
          </div>
        ))
      ) : (
        <p>No Products Found</p>
      )}
    </div>
  );
}
