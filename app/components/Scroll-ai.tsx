"use client";
import ImageScroller from "../components/ui/my_scroll";
import React, { useState, useEffect } from "react";
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

interface Iimage {
  url: string;
  name: string;
}

const MyApp = () => {
  const [allImages, setAllImages] = useState<Iimage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Icategory[] = await getCategoryData();
      const images = data.flatMap(item =>
        item.image ? [{ url: urlForImage(item.image).url(), name: item.name }] : []
      );
      setAllImages(images);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ImageScroller images={allImages} />
    </div>
  );
};

export default MyApp;
