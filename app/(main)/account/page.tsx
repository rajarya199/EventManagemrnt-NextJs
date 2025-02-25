// "use client"
// import Link from 'next/link'
// import React,{useState} from 'react'

// const page = () => {
//     const [searchQuery, setSearchQuery] = useState("");
    
//       const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(event.target.value);
//       };
    
//       const handleSearchSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log("Search Query:", searchQuery);
//       };
//   return (
//     <div>

// <div className="flex h-screen">
//       {/* Sidebar */}
//       <nav className="w-64 bg-white shadow-md h-full p-4 fixed left-0">
//         <ul className="space-y-4">
//           <li>
//             <Link href="/dashboard" className="flex items-center space-x-2 text-primary">
//               <i className="fa fa-desktop"></i>
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/login" className="flex items-center space-x-2 text-red-500">
//               <i className="fa fa-lock"></i>
//               <span>Login</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-1 ml-64 flex flex-col">
//         {/* Navbar */}
//         <nav className="bg-yellow-500 shadow-md p-4 flex justify-between items-center">
//           <form className="flex items-center space-x-2" onSubmit={handleSearchSubmit}>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
//                 <i className="fas fa-search"></i>
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//               />
//             </div>
//             <button
//               type="button"
//               className="ml-2 text-gray-600 hover:text-gray-800"
//               onClick={() => setSearchQuery("")}
//             >
//               ×
//             </button>
//           </form>

//           <div className="flex items-center space-x-4">
//             <button className="text-gray-700">
//               <i className="fa fa-bell"></i>
//             </button>
//           </div>
//         </nav>

//         {/* Content */}
//         <div className="p-6 bg-gray-100 flex-1 overflow-auto">

//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default page 

"use client"
import React from 'react'
import type  from "react"
import { SidebarProvider } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/profiledash/app-sidebar"
import { TopNav } from "@/src/components/profiledash/top-nav"
const page = () => {
  return (
    <div>
      <>
<SidebarProvider>
  <div className="flex min-h-screen w-full">
    <AppSidebar />
    <div className="flex-1">
      <TopNav />
      <main className="p-6"> 
        
      </main>
    </div>
  </div>
</SidebarProvider>
</>
    </div>
  )
}

export default page
