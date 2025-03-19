"use client"
import React,{useState} from 'react'
import Sidebar from "@/src/components/dash/Sidebar"
import { usePathname } from 'next/navigation';


export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode;
  

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
          flex-1 p-8 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "ml-[92px]" : "ml-64"}
        `}>
          {children}
      </main>
       
    </div>
  )
}
