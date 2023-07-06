import { Iproduct } from "@/app/product/page";
import { client } from "@/lib/sanityClient"; 
import SearchResult from "@/app/components/SearchResult";

async function getAllProductsForSearch() {
    let response = await client.fetch(`*[_type == "products"]`);
    return response;
};

const Search = async ({ params }: { params: { query: string } }) => {
    let slug = (params.query).toLowerCase();
    let data = await getAllProductsForSearch()
    let dataToMap = await data.filter((item: Iproduct) => {
        if ((item.name).toLowerCase().indexOf(slug) >= 0) {
            return true
        }
        return false
    });
    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 py-10 lg:grid-cols-4 gap-4"
        >
            {dataToMap && dataToMap.map((items: Iproduct, index: number) => (
                <SearchResult key={index} singleProductData={items} />
            ))}
        </div>
    )
}

export default Search