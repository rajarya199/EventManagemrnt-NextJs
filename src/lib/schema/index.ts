import * as z from "zod"
export const eventFormSchema=z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    eventDescription: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters').optional(),
    imageUrl: z.array(z.string()).optional() ,
    startTime: z.date(),
    endTime: z.date(),
    categoryId: z.string(),
    price: z.string().default('0'),
    isFree: z.boolean(),
    url: z.string().url(),
    type: z.enum(['Physical', 'Virtual']),
    

})

export const categorySchema=z.object({
    name: z.string().min(3, 'Title must be at least 3 characters'),
    categoryDescription: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    imageUrl: z.array(z.string()).optional() 

})

 export const organizationFormSchema = z.object({
    name: z.string().min(2),
    address: z.string().optional(),
    description: z.string().optional(),
    contact:z.string().optional(),
    users: z.array(z.object({
        userId: z.string().uuid(),
        role: z.enum(["Owner", "CoOrganizer", "Staff"]),
    })).min(1), // At least one user must be added
});
export type OrganizationFormValues = z.infer<typeof organizationFormSchema>;
