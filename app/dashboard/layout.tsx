"use client"
import React,{useState, ReactNode,} from 'react'
import Sidebar from "@/src/components/dash/Sidebar"
import { usePathname } from 'next/navigation';
import ThemeSwitcher from '@/src/components/theme/ThemeSwitcher';

export default function RootLayout({
  children,
  categoryStat,
  topCatEvent
}: {
  children: ReactNode;
  categoryStat:ReactNode;
  topCatEvent:ReactNode

}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const pathname=usePathname();
  return (
    <div className="flex w-full min-h-screen relative">
         <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
        <div className="absolute top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <main  className={` dark:bg-primary-900
          flex-1 p-8 overflow-auto transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "ml-20" : "ml-64"}
        `}>
          {children}
          {pathname==="/dashboard" &&(
            <>
            <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
            {categoryStat}
            {topCatEvent}
            </div>
           
            </>
          )}
      </main>
       
    </div>
  )
}
