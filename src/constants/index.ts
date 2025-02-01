
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  BarChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
export const headerLinks = [
   
    {
      label: 'Create Event',
      route: '/events/add',
    },
   
    {
      label: 'My Profile',
      route: '/profile',
    },
   
  ]

  export const headLinks=[
    {
      label: 'Home',
      route: '/',
    },
    {
        label:"About Us",
        route:"/about"
    },
    {
      label:"Contact Us",
      route:"/contact"
  },
  ]

  export const eventInitialValues={
    title: '',
    eventDescription: '',
    location: '',
    imageUrl: '',
    startTime: new Date(),
    endTime: new Date(),
    categoryId: '',
    price: '',
    type:"",
    isFree: false,
    url: '',
  }

  export const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      isActive: true,
    },
    {
      icon: Calendar,
      label: "Events",
      path: "/events",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      icon: Users,
      label: "Users",
      path: "/users",
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      icon: BarChart,
      label: "Analytics",
      path: "/analytics",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
  ];