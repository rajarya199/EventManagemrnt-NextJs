"use client"
import React,{useState} from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/src/components/ui/textarea";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import * as z from "zod";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
const formSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
  ticketPrice: z.number().min(0, "Price must be a positive number."),
  features: z.array(z.string()).optional(),
  totalStock: z.number().min(1, "Total stock must be at least 1."),
});
type TicketCategoryFormValues = z.infer<typeof formSchema>;

interface TicketFormProps {
    eventId: string;  }
const AddTicketForm = ({eventId}:TicketFormProps) => {
  const [newFeature, setNewFeature] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);

  const form = useForm<TicketCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ticketPrice: 0,
      features: [],
      totalStock: 1,
    },
  });
  const addFeatures = () => {
    const featureArray = newFeature.split("\n").map((feature) => feature.trim()).filter((feature) => feature);
    setFeatures(featureArray);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    setNewFeature(updatedFeatures.join("\n"));
  };
  const onSubmit = (values: TicketCategoryFormValues) => {
    
  }
  return (
    <div className='wrapper  mt-10'>
          <Form {...form}>
          <h1 className="text-2xl font-semibold mb-6 p-2">Ticket Category</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Category Name</FormLabel>
            <FormControl><Input placeholder="VIP, General, etc." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="ticketPrice" render={({ field }) => (
          <FormItem>
            <FormLabel>Ticket Price </FormLabel>
            <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Features Input */}
        <FormItem>
          <FormLabel>Features (one per line)</FormLabel>
          <FormControl>
            <Textarea
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Enter multiple features, each on a new line"
              className="w-full h-32"
            />
          </FormControl>
          <Button type="button" onClick={addFeatures} className="mt-2">
            Update Features
          </Button>
          <ul className="list-disc pl-5 mt-2">
            {features.map((feature, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{feature}</span>
                <Button variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                  ✕
                </Button>
              </li>
            ))}
          </ul>
        </FormItem>

        <FormField control={form.control} name="totalStock" render={({ field }) => (
          <FormItem>
            <FormLabel>Total Stock</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

      

        <Button type="submit"  className="w-full bg-green-600 text-white  rounded-md hover:bg-green-700">Add Ticket Category</Button>
      </form>
    </Form>
    </div>
  )
}

export default AddTicketForm