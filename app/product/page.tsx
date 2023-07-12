import React from "react";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"] {
    name,
    id,
    image,
    slug,
    price,
    description,
    category -> {
      name,
      description,
    }
  }`);
  return res;
};

export type Iproduct = {
  id: number;
  name: string;
  quantity: number;
  productTypes?: Array<string>;
  description?: string;
  image: IImage;
  slug: string | any;
  price: number;
  category?: {
    name?: string;
    description?: string;
  };
};

const Products = async () => {
  const data: Iproduct[] = await getProductData();
  return (
    <div className="max-w-auto mb-24 flex flex-wrap gap-6 justify-center">
      {data.map((item) => (
        <Link key={item.id} href={`/product/${item.id}`}>
          <div className="flex basis-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 outline-2 transition-all duration-300 hover:opacity-100 mt-16 h-auto font-normal">
            <div className="w-full h-auto shadow-md mt-10 font-medium">
              <div>
                <Image
                  width={400}
                  height={300}
                  src={urlForImage(item.image).url()}
                  alt="sindhvirsa"
                ></Image>
                <div className='flex justify-center font-bold text-xl shadow-sm'>
                  {item.name}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
  ;
};

export default Products;
