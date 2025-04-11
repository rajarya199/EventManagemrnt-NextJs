import React from 'react'
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Calendar, Ticket,UserCheck } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
interface RegProps{
    register:any
}
const RegistrationCard = ({register}:RegProps) => {
  return (
       <Card className="overflow-hidden shadow-md">
          <div className="relative h-56">
            <Image
              src={register.Event.imageUrl[0]}
              alt={register.Event.title}
              fill
              className="object-cover"
            />
             <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
              Registered
            </div>
          </div>
    
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-slate-900">{register.Event.title}</h3>
            <div className="flex items-center text-sm text-slate-600 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {format(new Date(register.Event.startTime), "MMM d, yyyy")}
              </span>
            </div>
            <div className='flex justify-between items-center gap-2'>
            <div className="flex items-center gap-1">
                         <UserCheck className="h-4 w-4 text-blue-600" />
                         <span>
                           {register.User.fname}   {register.User.lname}

                         </span>
                       </div>
                       <span
          className={`px-3 py-1 rounded-md text-sm ${
            register.status === "CONFIRMED" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {register.status}
        </span>

            </div>
             
    
          
          </CardContent>
    
         
        </Card>
  )
}

export default RegistrationCard