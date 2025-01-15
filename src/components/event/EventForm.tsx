"use client"
import React from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Input } from '../ui/input'
import { Textarea } from "@/src/components/ui/textarea"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

import { eventInitialValues } from '@/src/constants'
import { eventFormSchema } from '@/src/lib/schema'
import Dropdown from '../usable/Dropdown'

type EventFormProps={
    userId:string
    eventType:"Add" | "update"
}


const EventForm = ({userId,eventType}:EventFormProps) => {
     const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventInitialValues,
  })
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values)
  }
  return (
    <div className=''>EventForm {eventType}
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-5">
        <div className='flex flex-col gap-5 mt-4 md:flex-row'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='block text-sm font-semibold text-gray-800'>Event Title</FormLabel>
              <FormControl>
                <Input className='input-field' placeholder="event title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="eventDescription"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Event Category</FormLabel>
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value={field.value}/>
              </FormControl>
              <FormDescription>
                Select category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       
        
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
              control={form.control}
              name="eventDescription"
              render={({ field }) => (
                <FormItem className="w-full">
                   <FormLabel className='block text-sm font-semibold text-gray-800'>Event description</FormLabel>

                  <FormControl className="h-72">
                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='block text-sm font-semibold text-gray-800'>Event Title</FormLabel>
              <FormControl className='h-72'>
                <Input className='input-field' placeholder="event title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
               <FormLabel className='block text-sm font-semibold text-gray-800'>Location</FormLabel>

                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-2xl bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="location"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="Event location or Online" {...field} className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent" />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                         <FormField
          control={form.control}
          name="eventDescription"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Event Type</FormLabel>
              <FormControl>
              <Select >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Types of event" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Event-Type</SelectLabel>
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="Physical">Physical</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
              <FormDescription>
                Select Type
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default EventForm