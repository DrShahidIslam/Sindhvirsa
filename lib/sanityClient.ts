
import { createClient } from "next-sanity";



export const client = createClient({
  token: process.env.SANITY_ACCESS_TOKEN,
  projectId: "hahpdko6",
  dataset: "production",
  apiVersion: "2023-06-06",
  useCdn: true
});