import { Iproduct } from "../page";
import { getProductData } from "../page";
import ContextWrapper from "../../../global/context/page";
import ProductDetail from "@/app/components/ProductDetail";

// const product: Iproduct[] = await getProductData();

// const productdetail = (id: number) => {
//   return product.filter((product) => product.id == id);
// };

// export default function Page({ params }: { params: { slug: number } }) {
//   const result = productdetail(params.slug);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const product = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-06/data/query/production?query=*[_type == "product"]`
  ).then((res: any) => res.json());
  const titleToSet: Iproduct = product.result.find(
    (item: Iproduct) => item.slug.current == slug
  );

  return {
    title: titleToSet.name,
    description: titleToSet.description,
  };
}

// fetch particular data of product using slug
async function fetchPreviewData(slug: string) {
  let res = await fetch(
    `https://hahpdko6.api.sanity.io/v2023-05-26/data/query/production?query=*%5B_type%20%3D%3D%20"products"%20%26%26%20slug.current%3D%3D%20"${slug}"%5D`
  );
  return res.json();
}

// will make static pages of every product
export async function generateStaticParams() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-06/data/query/production?query=*[_type == "product"]`,
    {
      next: {
        revalidate: 60,
      },
    }
  ).then((res: any) => res.json());
  return res.result.map((item: Iproduct) => {
    slug: item.slug;
  });
}
export interface responseType {
  result: Array<Iproduct>
}

const Catalog = async ({ params }: { params: { slug: string } }) => {
  let data: responseType = await fetchPreviewData(params.slug);

  return (
    <ContextWrapper>
      <ProductDetail item={data.result[0]} />
    </ContextWrapper>
  );
};
