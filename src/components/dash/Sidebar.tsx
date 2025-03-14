"use client"
import React,{useState,useEffect} from 'react'
import { usePathname } from "next/navigation";

import { menuItems } from '@/src/constants';
import Link from 'next/link';
import {
    LogOut,
    ChevronLeft,
    ChevronRight,
    CalendarDays
  } from "lucide-react";
import { Tooltip } from './Tooltip';
import Image from 'next/image';
interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
  }
const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const pathName = usePathname();

  return (
    <div>
        <div
      className={`
        ${isCollapsed ? "w-20" : "w-64"}
        h-screen bg-primary-50 border-r border-gray-200  fixed left-0 top-0
        transition-all duration-300 ease-in-out z-50
      `}
    >
    {/* <div
        className={`p-6 ${isCollapsed ? "justify-center" : "px-6"} flex items-center gap-3`}
      >
        <div className="flex  gap-1 flex-1 min-w-0">
    
          <div className='w-12'>
            .
          <Link href="/" >
        <img src="/assets/icons/logo.svg" alt='logo' width="48" height="28"/>
         </Link>
          </div>
         
        
          <h1
            className={`
              text-xl font-bold text-gray-800 whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"}
            `}
          >
            EventGLobe
          </h1>
          <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg  "
        >
          {isCollapsed ? (
            <ChevronRight className="ml-20 hover:bg-gray-100  w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="  hover:bg-gray-100 w-5 h-5 text-gray-600" />
          )}
        </button>
        </div>
       
      </div> */}

      
          <div
        className={`
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "flex flex-col items-center gap-4 pt-6" : "flex items-center justify-between p-6"}
        `}
      >
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          <div >
          <Link href="/" >
        <Image src="/assets/icons/logo.svg" alt='logo' width="48" height="28"/>
         </Link>
          </div>
          <h1
            className={`
              text-xl font-bold text-gray-800 whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${isCollapsed ? "hidden" : "block"}
            `}
          >
            EventGlobe
          </h1>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            p-1.5 rounded-lg hover:bg-gray-100 flex-shrink-0
            transition-all duration-300 ease-in-out
            ${isCollapsed ? "w-8 h-8 flex items-center justify-center" : ""}
          `}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      <nav className="mt-6">
        <div className="px-3 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className={`relative flex items-center px-3 py-2 hover:scale-105  ease-in  rounded-lg transition-all duration-200  ${isCollapsed ? "justify-center" : ""}
                 ${pathName === item.path ? "shadow-[#3a3737] bg-white"  : "text-gray-600 hover:bg-gray-200"  } 

                   `}
                  //  ${item.isActive ? "bg-gray-100" : "text-gray-600 hover:bg-gray-50"}

              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={`relative p-2 rounded-lg ${item.color} shadow-lg transform transition-transform duration-200 hover:scale-110`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span
                className={`ml-3 transition-all duration-200 ${isCollapsed ? "hidden" : ""}`}
              >
                {item.label}
              </span>
              {isCollapsed && (
                <Tooltip
                  text={item.label}
                  visible={hoveredItem === item.label}
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
      <div className="absolute w-full px-3 space-y-2">
        <button
          className={`relative flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg w-full ${isCollapsed ? "justify-center" : ""}`}
          onMouseEnter={() => setHoveredItem("Logout")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="relative p-2 rounded-lg bg-gradient-to-br from-red-400 to-red-600 shadow-lg transform transition-transform duration-200 hover:scale-110">
            <LogOut className="w-5 h-5 text-white" />
          </div>
          <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>Logout</span>
          {isCollapsed && (
            <Tooltip text="Logout" visible={hoveredItem === "Logout"} />
          )}
        </button>
      </div>
    </div>
    </div>
  )
}

export default Sidebar