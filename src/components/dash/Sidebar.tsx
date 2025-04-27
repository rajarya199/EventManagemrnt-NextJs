"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { menuItems } from "@/src/constants";
import Link from "next/link";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; 
import Image from "next/image";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const pathName = usePathname();

  return (
    <div>
      <div
        className={`
          ${isCollapsed ? "w-24" : "w-64"}
          h-screen bg-primary-50 dark:bg-primary-600 border-r border-gray-200  dark:border-gray-600 fixed left-0 top-0
          transition-all duration-300 ease-in-out z-50
        `}
      >
        {/* Header Section */}
        <div
          className={`
            transition-all duration-300 ease-in-out
            ${isCollapsed ? "flex flex-col items-center gap-4 pt-6" : "flex items-center justify-between p-6"}
          `}
        >
          <div
            className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
          >
            <div>
              <Link href="/">
                <Image src="/assets/icons/logo.svg" alt="logo" width="48" height="28" />
              </Link>
            </div>
            <h1
              className={`
                text-xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap
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
              p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0
              transition-all duration-300 ease-in-out
              ${isCollapsed ? "w-8 h-8 flex items-center justify-center" : ""}
            `}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Scrollable Menu Section */}
        <nav  className={`mt-6 ${
            isCollapsed ? "h-[calc(100vh-200px)]" : "h-[calc(100vh-180px)]"
          } overflow-y-auto`}>
          <div className="px-3 space-y-2">
            {menuItems.map((item) => (
              <Tippy content={item.label} placement="right"  key={item.label} disabled={!isCollapsed}>
                <Link
                  href={item.path}
                  className={`relative flex items-center px-3 py-2 hover:scale-105 ease-in rounded-lg transition-all duration-200 ${
                    isCollapsed ? "justify-center" : ""
                  } ${
                    pathName === item.path
                      ? "shadow-[#3a3737] bg-white dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200  dark:hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`relative p-2 rounded-lg ${item.color} shadow-lg transform transition-transform duration-200 hover:scale-110`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </Tippy>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute w-full  px-2 space-y-2 bottom-0">
          <Tippy content="Logout" placement="right" disabled={!isCollapsed}>
            <button
              className={`relative flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-800 rounded-lg w-full ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-red-400 to-red-600 shadow-lg transform transition-transform duration-200 hover:scale-110">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
