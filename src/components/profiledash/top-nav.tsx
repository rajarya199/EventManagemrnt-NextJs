import { Search } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { NotificationsPopover } from "./notifications"
import { AppLauncher } from "./app-launcher"
import { UserNav } from "@/src/components/profiledash/user-nav"
import { SidebarTrigger } from "@/src/components/ui/sidebar"

export function TopNav() {
  return (
    <header className="sticky  w-full top-0 z-50 flex h-16 items-center gap-4 border-b bg-[#1c1c84] px-6">
      <div className="flex flex-1 items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-white/10" />
        <div className="relative flex-1 max-w-md">
          <Search className=" absolute left-2 top-2.5 h-4 w-4 " />
          <Input
            placeholder="Search"
            className="pl-8 rounded-full bg-slate-50 border-0  placeholder:text-gray-500 focus-visible:ring-white/30"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationsPopover />
        <AppLauncher />
        <UserNav />
      </div>
    </header>
  )
}



{/* <div className="relative flex-1 max-w-md">
<Search className="absolute left-2 top-2.5 h-4 w-4 " />
<Input
  placeholder="Search"
  className="pl-8 rounded-full bg-slate-50 border-0 placeholder:text-gray-500 focus-visible:ring-white/30"
/>
</div> */}