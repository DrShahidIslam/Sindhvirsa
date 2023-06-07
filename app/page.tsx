import { NavigationMenuDemo } from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollImage from "./components/Scroll-ai";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"] {
    title,
    _id,
    image,
    price
    description,
    category -> {
      name,
      description
    }
  }`);
  return res;
};

interface Iprdoduct {
  map(arg0: (item: any) => import("react").JSX.Element): import("react").ReactNode;

  title: string;
  description: string;
  image: IImage;
  price: number;
  category: {
    name: string;
    description: string;
  };
}

export default async function Home() {
  const data: Iprdoduct = await getProductData();

  return (
    <main>
          <Header />
          <NavigationMenuDemo />
          <ScrollImage />
          {data.map((item) => (
          <><div className="m-10 bg-blue-300 flex justify-center">
              <div className="flex basis-1 w-auto h-auto font-normal shadow-md">
                <div className="w-56 h-56 bg-red-200 shadow-xl outline-1 m-6 font-medium">
                  <Image
                    width={300}
                    height={300}
                    src={urlForImage(item.image).url()}
                    alt="sindhvirsa"
                  ></Image>
                  {item.title}
                </div>
                <div className="w-56 h-56 bg-red-200 shadow-xl outline-1 m-6 font-medium">
                  Satrangi Collection
                </div>
                <div className="w-56 h-56 bg-red-200 shadow-xl outline-1 m-6 font-medium">
                  Satrangi Collection
                </div>
                <div className="w-56 h-56 bg-red-200 shadow-xl outline-1 m-6 font-medium">
                  Satrangi Collection
                </div>
                <div className="w-56 h-56 bg-red-200 shadow-xl outline-1 m-6 font-medium">
                  Satrangi Collection
                </div>
              </div>
            </div><Footer /></>
      ))}
    </main>
  );
}
