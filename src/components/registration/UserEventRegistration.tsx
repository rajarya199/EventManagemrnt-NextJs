"use client"
import { getUserRegFreeEvent } from '@/app/actions/eventRegUser.action'
import React,{useState,useEffect} from 'react'
import RegistrationCard from './RegistrationCard'

interface regProps{
    userId:string
}

const UserEventRegistration = ({userId}:regProps) => {
    const[registers,setRegisters]=useState<any[]>([])
      useEffect(() => {
                      const fetchData = async () => {
                        try {
                          const response = await getUserRegFreeEvent(userId);
                          if (response.success && response.data) {
                            setRegisters(response.data);
                          } else {
                            console.error("Failed to fetch registration data");
                          }
                        } catch (error) {
                          console.error("Failed to fetch registrations datas");
                        }
                      };
                      fetchData();
                    }, [])
  return (
    <div>
      <div>
      <h2 className="text-2xl font-semibold p-2">
        Registered Events </h2>

      </div>
      <div>
        {registers.length===0 ?(
          <p> No registration yet</p>
        ):(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {registers.map((register)=>(
              <RegistrationCard  key={register.id} register={register}/>
            ))}
            </div>
        )
      }
      </div>
    </div>
  )
}

export default UserEventRegistration