
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  BarChart,
  Tag,
  Users2,
  Ticket,
  LogOut,
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
  // export const menuItems = [
  //   {
  //     icon: LayoutDashboard,
  //     label: "Dashboard",
  //     path: "/dashboard",
  //     color: "text-purple-600", // Use text-[color] class from Tailwind CSS
  //     isActive: true,
  //   },
  //   {
  //     icon: Calendar,
  //     label: "Events",
  //     path: "/dashboard/events",
  //     color: "text-blue-600", // Use text-[color] class from Tailwind CSS
  //   },
  //   {
  //     icon: Tag,
  //     label: "Categories",
  //     path: "/dashboard/categories",
  //     color: "text-teal-600", 
  //   },
  //   {
  //     icon: Users2,
  //     label: "Organizers",
  //     path: "/dashboard/organizers",
  //     color: "text-indigo-600", 
  //   },
  //   {
  //     icon: Ticket,
  //     label: "Tickets",
  //       path:"/dashboard/tickets" ,
  //       color:"text-orange-600" ,
  //    } ,
  //    {icon : Users , 
  //      label : 'Users' , 
  //      path : '/dashboard/users' , 
  //      color:'text-green-600',},
     
  //    {icon : BarChart , 
  //      label:'Analytics' ,
  //      path:'/dashboard/analytics',
  //      color:'text-yellow-600',},
     
  //    {icon : Settings,  
  //        label :'Settings',
  //        path:'/dashboard/settings',
  //        color:'text-pink-600',} ,
  
  // ];
  
  export const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      isActive: true,
    },
    {
      icon: Calendar,
      label: "Events",
      path: "/dashboard/events",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      icon: Tag,
      label: "Categories",
      path: "/dashboard/categories",
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
    },
    {
      icon: Users2,
      label: "Organizers",
      path: "/dashboard/organizers",
      color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    },
    {
      icon: Ticket,
      label: "Tickets",
      path: "/dashboard/tickets",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
    },
    {
      icon: Users,
      label: "Users",
      path: "/dashboard/users",
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    
    {
      icon: BarChart,
      label: "Analytics",
      path: "/dashboard/analytics",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/settings",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
  ];