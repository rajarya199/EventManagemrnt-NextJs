"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Settings, Calendar, Ticket,Tickets, Building2, HelpCircle, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar"
import { cn } from "@/src/lib/utils"

const menuItems = [
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Bookings",
    icon: Tickets,
    href: "/profile/my-bookings",
  },
 
  {
    title: "My Events",
    icon: Calendar,
    href: "/profile/my-events",
  },
  {
    title: "Tickets",
    icon: Ticket,
    href: "/tickets",
  },
  {
    title: "Organization",
    icon: Building2,
    href: "/organization",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Home className="h-6 w-6" />
          <span className="text-xl font-bold">EventGlobe</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.title} className="my-1">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-12 text-base transition-all duration-200 ease-in-out",
                    isActive
                      ? "bg-primary text-primary-foreground font-medium translate-x-1 shadow-md"
                      : "hover:bg-primary/10 hover:translate-x-1 hover:shadow-sm",
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className={cn("h-5 w-5 hover:text-primary", isActive ? "h-6 w-6 text-primary" : "")} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-12 text-base transition-all duration-200 ease-in-out hover:bg-primary/10 hover:translate-x-1 hover:shadow-sm dark:hover:bg-red-900"
            >
              <a
                href="/logout"
                className="flex items-center gap-3 text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

