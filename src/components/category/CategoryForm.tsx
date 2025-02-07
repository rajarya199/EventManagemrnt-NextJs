"use client"
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import { addCategory } from '@/app/actions/category.action'
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
  import { useRouter } from "next/navigation";

  import { Textarea } from "@/src/components/ui/textarea"
import "@uploadcare/react-uploader/core.css";
import { categorySchema } from '@/src/lib/schema'
const CategoryForm = () => {
  const router = useRouter();

  const [allImages, setAllImages] = useState<string[]>([]); 
  const uploadkey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || "";
  const handleRemoveImage = (index: number) => {
    setAllImages((prev) => prev.filter((_, i) => i !== index));
  };


    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          name: "",
          categoryDescription: "",
          imageUrl: [],
        },
      });


      const onSubmit = async (values: z.infer<typeof categorySchema>) => {
        try {
            
            const allImageUrls = [...allImages, ...(values.imageUrl || [])];
          
            const categoryData = {
                ...values,
                imageUrl: allImageUrls, 
            };

          
         const result= await addCategory(categoryData);
         if(result.success && result.data){
          form.reset();
          setAllImages([]); 
          alert("Category saved successfully!");
          router.push("/dashboard/categories")

         }

           
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Failed to save category.");
        }
    };
  return (
    <div className='w-4/6 mx-auto mt-2'>
        <h2 className='text-lg my-1'> Add Category</h2>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}   className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
              {/* <Input placeholder="Event location or Online" {...field} className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent" /> */}

                <Input  className="inputarea" placeholder="Category Name" {...field} />
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
                                    <Textarea className='text-area' placeholder="Description" {...field} />
                    </FormControl>
              
              {/* <FormDescription>
                Enter the description of the category.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

          <div>
          <FormLabel className='block  mb-4 text-sm font-semibold text-gray-800'>Category Images</FormLabel>
          <FileUploaderRegular
         sourceList="local, url, camera, dropbox"
          className='px-2'
         classNameUploader="uc-light bg-blue-500 "
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
           <Button className='w-full pu-2' type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default CategoryForm