// import { useState } from 'react'
// import { useRouter } from 'next/router'

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const router = useRouter()

//   const handleSearch = (event: { preventDefault: () => void }) => {
//     event.preventDefault()
//     router.push(`/search?query=${searchTerm}`)
//   }

//   return (
//     <form onSubmit={handleSearch} className="relative w-full md:w-auto">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//         placeholder="Search..."
//       />
//       <button type="submit" className="absolute right-2 top-2 text-gray-500">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 1110.606-6.364L21 9.5a9 9 0 10-11.414 0L9.5 17z"
//           />
//         </svg>
//       </button>
//     </form>
//   )
// }

// export default SearchBar
