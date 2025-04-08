"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from '@/src/components/ui/checkbox'
import { Button } from "@/src/components/ui/button"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import "@uploadcare/react-uploader/core.css";
import { saveEvent } from '@/app/actions/event.action'
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import SearchAutoComplete from '../address/SearchAutoComplete'
import { EventsType } from '@/types';
import AddressMap from '../address/AddressMap';
type EventFormProps={
    userId:string
    eventType:"Add" | "update"
}


const EventForm = ({userId,eventType}:EventFormProps) => {
  const router = useRouter();
  const uploadkey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || "";
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.7172, 85.324]);
  const [allImages, setAllImages] = useState<string[]>([]); 
  const[totalTickets,setTotalTickets]=useState<number>(0)
  const [addressData, setAddressData] = useState({
    address: "",
    location: ""
  });

     const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventInitialValues,
  })


  const handleRemoveImage = (index: number) => {
    setAllImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit=async(values:z.infer<typeof eventFormSchema> )=> {
    console.log(userId)

    console.log(values)
    const eventData={...values,
      location: addressData.location || "", 
      imageUrl:allImages,
      address:addressData.address || ""
    }
    if (!values.isFree) {
      delete eventData.eventCapacity;
    }
    console.log("ee",eventData)
    try{
      const newEvent= await saveEvent(userId,eventData,totalTickets)
      if(newEvent.success && newEvent.data){
        console.log("event created successfully")
        form.reset();
        setAllImages([]); 
        alert("event saved")
        router.push(`/`)
      }
      else{
        console.error(newEvent.message)
      }
    }
    catch(error){
      console.error("error saving event",error)
      console.log(error)
      alert("failed to save event")
    }
  }

  const handleAddressUpdate = (address: string,lat?:number,lng?:number) => {
    setAddressData(prev => ({
      ...prev,
      address
    }));
    if (lat !== undefined && lng !== undefined) {
      setMapCenter([lat, lng]);
      setAddressData(prev => ({
          ...prev,
          location: `${lat}, ${lng}`
      }));
  } else {
      // Fetch LatLng from Address only when lat/lng are not directly provided
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
          .then((res) => res.json())
          .then((data) => {
              if (data.length > 0) {
                  const { lat, lon } = data[0];
                  setMapCenter([parseFloat(lat), parseFloat(lon)]);
                  setAddressData(prev => ({
                      ...prev,
                      location: `${lat}, ${lon}`
                  }));
              }
          })
          .catch(console.error);
  }
  };
  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setMapCenter([lat, lng]);
    // setAddressData(prev => ({
    //   ...prev,
    //   address,
    //   location: `${lat}, ${lng}`
    // }));
    handleAddressUpdate(address, lat, lng)
  };

  return (
    <div className=''>
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
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Event Category</FormLabel>
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value={field.value}/>
              </FormControl>
              {/* <FormDescription>
                Select category
              </FormDescription> */}
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
         <div className=' w-full'>
         <FormLabel className='block  mb-4 text-sm font-semibold text-gray-800'>Event Images</FormLabel>

         <FileUploaderRegular
         sourceList="local, url, camera, dropbox"

         classNameUploader="uc-light "
         pubkey={uploadkey}
          imgOnly={true}
          onChange={(event) => {
            const files = event.successEntries || [];
            const urls = files.map((file) => file.cdnUrl);
            setAllImages((prev) => [...prev, ...urls]);
          }}
      />
        <div className="flex gap-4 flex-wrap mt-2 mb-2">
              {allImages.map((url, index) => (
                <div key={index} className="relative">
                <Image
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    width={96}
                                    height={96}
                                    className="object-cover rounded border"
                                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

         </div>
        </div>  
      

        
        <div className="flex flex-col gap-5 md:flex-row">
          {/* <FormField
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
            /> */}
                         <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Event Type</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange}  >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Types of event" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Event-Type</SelectLabel>
          <SelectItem value="Physical">Physical</SelectItem>
          <SelectItem value="Virtual">Virtual</SelectItem>


        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
              {/* <FormDescription>
                Select Type
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />  
    

  
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel className='block text-sm font-semibold text-gray-800'>Start Date-Time</FormLabel>

                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date | null) => {
                          if (date) {
                              field.onChange(date);
                          } 
                      }} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="w-full">
                                  <FormLabel className='block text-sm font-semibold text-gray-800'>End Date-Time</FormLabel>

                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date | null) => {
                          if (date) {
                              field.onChange(date);
                          } 
                      }} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                 Address
              </label>
              <SearchAutoComplete value={addressData.address} onChange={value => handleAddressUpdate(value)} onLocationSelect={handleLocationSelect} />
            </div>
           
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location Coordinates
              </label>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-2xl bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="location"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="Event location or Online" value={addressData.location} readOnly className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent" />
                    </div>
            </div>
            <div>
            <AddressMap mapCenter={mapCenter} setMapCenter={setMapCenter} setAddressData={setAddressData} />

            </div>
        <div className="flex flex-col gap-5 md:flex-row items-center justify-center">
        <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                                  <FormLabel className='block text-sm font-semibold text-gray-800'>Urls</FormLabel>

                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/link.svg"
                        alt="link"
                        width={24}
                        height={24}
                      />
                                            <Input placeholder="URL" {...field} className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent" />

                  
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem className='w-full'>
                   <FormLabel className='block text-sm font-semibold text-gray-800'>Ticket</FormLabel>

                            <FormControl>
                              <div className="flex items-center">
                                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                <Checkbox
                                      onCheckedChange={(checked) => {
                                        field.onChange(checked);
                                      }}
                                  checked={field.value}
                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />   
        
        </div>
        {form.watch("isFree") && (
            <div className='flex flex-col gap-5 md:flex-row'>
                <FormField
              control={form.control}
              name="eventCapacity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className='block text-sm font-semibold text-gray-800'>Event Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className='input-field'
                      placeholder="Event Capacity"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
</div>
          
          )}
       
{!form.watch("isFree")  &&(
  <div className='flex flex-col gap-5 md:flex-row'>
               <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block text-sm font-semibold text-gray-800">Ticket Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<div className='w-full'>
              <label htmlFor="totalStock" className="block text-sm font-medium text-gray-700 mb-1">
                Total Tickets
              </label>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-2xl bg-grey-50 px-4 py-2">
              <Input 
      placeholder="Number of tickets"
      value={totalTickets.toString()} // Convert number to string for input field
      type="number"
      onChange={(e) => setTotalTickets(Number(e.target.value) || 0)} // Ensure valid number
      className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent" 
    />
                    </div>
            </div>

{/* <FormField
                control={form.control}
                name="totalStock"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="block text-sm font-semibold text-gray-800">Total Tickets</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100" {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
</div>
)}
        <Button type="submit" 
        className='button col-span-2 w-full'
        size="lg" disabled={form.formState.isSubmitting}>

{form.formState.isSubmitting ? (
            'Submitting...'
          ): `${eventType} Event `}
        </Button>
      </form>
    </Form>
    </div>
  )
}

export default EventForm