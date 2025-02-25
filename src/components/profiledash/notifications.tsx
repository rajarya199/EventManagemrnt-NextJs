import { Bell } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar"

const notifications = [
  {
    id: 1,
    name: "John Snow",
    message: "Lets meet at Starbucks at 11:30. Wdyt?",
    time: "2 hrs ago",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TU4TWL56BpEPtr3TLdBIMkrLqzR7xJ.png",
  },
  {
    id: 2,
    name: "John Snow",
    message: "A new issue has been reported for Argon.",
    time: "3 hrs ago",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TU4TWL56BpEPtr3TLdBIMkrLqzR7xJ.png",
  },
  {
    id: 3,
    name: "John Snow",
    message: "Your posts have been liked a lot.",
    time: "5 hrs ago",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TU4TWL56BpEPtr3TLdBIMkrLqzR7xJ.png",
  },
]

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="text-white">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="text-sm">
            You have <span className="font-medium text-primary">13</span> notifications.
          </div>
          <div className="divide-y">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-4 py-4">
                <Avatar>
                  <AvatarImage src={notification.avatar} alt={notification.name} />
                  <AvatarFallback>{notification.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{notification.name}</span>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full justify-center">
            View all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

