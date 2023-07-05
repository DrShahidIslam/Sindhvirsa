import ImageScroller from "../components/ui/my_scroll";
import React from "react";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "@/sanity/lib/image";

export const getCategoryData = async () => {
  const res = await client.fetch(`*[_type=="category" && image != null] {
      name,
      description,
      _id,
      image
  }`);
  return res;
};

interface Icategory {
  name: string;
  description: string;
  image: IImage;
}

const MyApp = async () => {
  const data: Icategory[] = await getCategoryData();
  const allImages = data.flatMap(item =>
    item.image ? [{ url: urlForImage(item.image).url(), name: item.name }] : []
  );
  return (
    <div>
      <ImageScroller images={allImages} />
    </div>
  );
};

export default MyApp;
