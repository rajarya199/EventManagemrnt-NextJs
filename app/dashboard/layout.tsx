"use client"
import React,{useState, ReactNode,} from 'react'
import Sidebar from "@/src/components/dash/Sidebar"
import { usePathname } from 'next/navigation';


export default function RootLayout({
  children,
  categoryStat
  
}: {
  children: ReactNode;
  categoryStat:ReactNode
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const pathname=usePathname();
  return (
    <div className="flex w-full min-h-screen">
         <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <main  className={`
          flex-1 p-8 overflow-auto transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "ml-20" : "ml-64"}
        `}>
          {children}
          {pathname==="/dashboard" &&(
            <>
            <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
            {categoryStat}
            </div>
           
            </>
          )}
      </main>
       
    </div>
  )
}
