"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { getAllUsers } from "@/app/actions/user.actions";
import { Trash2 } from "lucide-react";
const formSchema = z.object({
    name: z.string().min(2),
    address: z.string().optional(),
    description: z.string().optional(),
    contact:z.string().optional(),
    users: z.array(z.object({
        userId: z.string().uuid(),
        role: z.enum(["Owner", "CoOrganizer", "Staff"]),
    })).min(1), // At least one user must be added
});

type OrganizationFormValues = z.infer<typeof formSchema>;

export  default function OrganizationForm() {
    const [usersData, setUsersData] = useState<any[]>([])
    
    const form = useForm<OrganizationFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            description: "",
            contact:"",
            users: [{ userId: "", role: "Owner" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "users",
    });

    useEffect(() => {
      async function fetchUsers() {
        try{
            const response=await getAllUsers();
            if(response.success && response.data){
                setUsersData(response.data)
            }
        }
        catch(error){
         console.error("failed to fetch user data")
        }
      }
        fetchUsers();
    }, []);

    const onSubmit = async (values: OrganizationFormValues) => {
        console.log(values);
        
    };

    return (
        <div className="container mx-auto mt-10">
            <Form {...form}>
            <h1 className="text-2xl font-semibold mb-6">Organization Details</h1>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Organization Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contact Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
 <div className="mt-8">
 <h2 className="text-xl font-semibold mb-4">Team Members</h2>
   {/* Dynamic User Selection */}
   <div className="space-y-4">
   {fields.map((item, index) => (

<div key={item.id} className="flex space-x-4">
    <div className="flex-1">
    <Select
        onValueChange={(value) => form.setValue(`users.${index}.userId`, value)}
        defaultValue={item.userId}
    >
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select User" />
        </SelectTrigger>
        <SelectContent>
            {usersData.map(item => (
                <SelectItem key={item.id} value={item.id}>
                    {item.fname} {item.lname}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
    </div>
    <div className="flex-1">
             {/* Role Selection */}
    <Select
        onValueChange={(value) => form.setValue(`users.${index}.role`, value as "Owner" | "CoOrganizer" | "Staff")}
        defaultValue={item.role}
    >
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
            {["Owner", "CoOrganizer", "Staff"].map(role => (
                <SelectItem key={role} value={role}>
                    {role}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
</div>
    {/* Remove Button */}

    <button
  type="button"
  className={`text-red-500 hover:text-red-700 ${fields.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
  onClick={() => remove(index)}
  disabled={fields.length === 1}
>
  <Trash2 className="w-5 h-5" />
</button>
</div>
))}
   </div>


{/* Add More Users Button */}
<Button   className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
 type="button" onClick={() => append({ userId: "", role: "Owner" })}>
Add More Users
</Button>
 </div>
                  

                    <div>
                    <button className="w-full  px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
 type="submit">Create Organization</button>

                    </div>
                </form>
            </Form>
        </div>
    );
}