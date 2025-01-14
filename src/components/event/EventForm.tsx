"use client"
import React from 'react'
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
        <div className='felx flex-col gap-5 md:flex-row'>

        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default EventForm