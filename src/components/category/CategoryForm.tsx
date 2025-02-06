"use client"
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
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
import "@uploadcare/react-uploader/core.css";
import { categorySchema } from '@/src/lib/schema'
const CategoryForm = () => {
    const form = useForm<any>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          name: "",
          categoryDescription: "",
          imageUrl: [],
        },
      });
  return (
    <div className='w-4/6 mx-auto mt-2'>
        <h2 className='text-lg my-1'> Add Category</h2>
        <Form {...form}>
      <form  className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category Name" {...field} />
              </FormControl>
              {/* <FormDescription>
                Enter the name of the product.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Description</FormLabel>
            
                 <FormControl className="h-36">
                                    <Textarea placeholder="Description" {...field} />
                    </FormControl>
              
              {/* <FormDescription>
                Enter the description of the category.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Image URL" {...field} />
              </FormControl>
              {/* <FormDescription>
                Enter the URL of the image.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
           <Button className='w-full pu-2' type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default CategoryForm