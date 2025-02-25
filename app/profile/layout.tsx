"use client"
import type React from "react"
import { SidebarProvider } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/profiledash/app-sidebar"
import { TopNav } from "@/src/components/profiledash/top-nav"


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
 <>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex-1">
                <TopNav />
                <main className="p-6">{children}</main>
              </div>
            </div>
          </SidebarProvider>
     </>
  )
}

