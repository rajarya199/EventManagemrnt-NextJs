"use client"
import React,{useState} from 'react'
import Sidebar from "@/src/components/dash/Sidebar"


export default function RootLayout({
  children,

}: {
  children: React.ReactNode;

}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
         <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <main  className={`
          flex-1 p-8 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "ml-20" : "ml-64"}
        `}>
      {children}
    
    
      </main>
       
    </div>
  )
}
