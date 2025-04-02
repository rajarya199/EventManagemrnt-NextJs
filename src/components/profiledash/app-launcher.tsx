import { Calendar, Mail, CreditCard, FileText, Map, ShoppingBag, Layers,Ticket ,Building2} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import Link from "next/link"
const apps = [
  {
    name: "Events",
    icon: Calendar,
    color: "bg-red-500",
    href:"/profile/my-events"
  },
  {
    name: "Ticket",
    icon: Ticket,
    color: "bg-blue-500",
      href:"/profile/my-tickets"
  },
  {
    name: "Payments",
    icon: CreditCard,
    color: "bg-blue-500",
      href:"/profile"
  },
  {
    name: "Reports",
    icon: FileText,
    color: "bg-emerald-500",
      href:"/profile"
  },
  // {
  //   name: "Maps",
  //   icon: Map,
  //   color: "bg-purple-500",
  // },
  {
    name: "Organization",
    icon: Building2,
    color: "bg-purple-500",
      href:"/profile"
  },
  {
    name: "Booking",
    icon: ShoppingBag,
    color: "bg-yellow-500",
      href:"/profile/my-bookings"
  },
]

export function AppLauncher() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="text-white">
          <Layers className="h-5 w-5" />
          <span className="sr-only">App launcher</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid grid-cols-3 gap-4">
          {apps.map((app) => (
            <Link key={app.name} href={app.href} passHref>
              <Button
            
              variant="ghost"
              className="flex h-24 w-full flex-col items-center justify-center gap-2"
            >
              <div className={`rounded-full p-2 ${app.color}`}>
                <app.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-medium">{app.name}</span>
            </Button>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

