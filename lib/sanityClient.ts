import { createClient } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';



export const client = createClient({
  token: process.env.SANITY_ACCESS_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-06-06",
  useCdn: true
});

const builder = createImageUrlBuilder(client)

export const urlFor = (source:Image) => builder?.image(source)
