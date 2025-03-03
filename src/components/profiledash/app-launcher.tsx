import { Calendar, Mail, CreditCard, FileText, Map, ShoppingBag, Layers } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"

const apps = [
  {
    name: "Events",
    icon: Calendar,
    color: "bg-red-500",
  },
  {
    name: "Email",
    icon: Mail,
    color: "bg-orange-500",
  },
  {
    name: "Payments",
    icon: CreditCard,
    color: "bg-blue-500",
  },
  {
    name: "Reports",
    icon: FileText,
    color: "bg-emerald-500",
  },
  {
    name: "Maps",
    icon: Map,
    color: "bg-purple-500",
  },
  {
    name: "Booking",
    icon: ShoppingBag,
    color: "bg-yellow-500",
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
            <Button
              key={app.name}
              variant="ghost"
              className="flex h-24 w-full flex-col items-center justify-center gap-2"
            >
              <div className={`rounded-full p-2 ${app.color}`}>
                <app.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-medium">{app.name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

