// import { useRouter } from 'next/router'
// import { db } from "@/lib/drizzle";

// const SearchPage = ({ products }) => {
//   const router = useRouter()
//   const { query } = router.query

//   return (
//     <div>
//       <h1>Search results for "{query}"</h1>
//       {/* display search results here */}
//       {products.map(product => (
//         <div key={product.id}>
//           <h2>{product.name}</h2>
//           {/* other product details */}
//         </div>
//       ))}
//     </div>
//   )
// }

// export async function getServerSideProps(context) {
//   const { query } = context.query
//   const products = await db.select().from('products').where('name', 'ilike', `%${query}%`)
  
//   return {
//     props: {
//       products,
//     },
//   }
// }

// export default SearchPage
