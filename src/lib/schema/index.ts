import * as z from "zod"
export const eventFormSchema=z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    eventDescription: z.string().min(3, 'Description must be at least 3 characters'),
    location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters').optional(),
    imageUrl: z.array(z.string()).optional() ,
    startTime: z.date(),
    endTime: z.date(),
    categoryId: z.string(),
    price: z.string().default('0'),
    isFree: z.boolean(),
    url: z.string().url(),
    type: z.enum(['Physical', 'Virtual']),
    eventCapacity: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Event capacity must be a number",
    }),
})  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be greater than start time",
    path: ["endTime"], 
  }).superRefine((data, ctx) => {
    if (data.isFree) {
      if (data.eventCapacity === undefined || data.eventCapacity <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Event capacity is required and must be greater than 0 ",
          path: ["eventCapacity"],
        });
      }
    }
  });

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

const ticketFormSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
  ticketPrice: z.number().min(0, "Price must be a positive number."),
  features: z.array(z.string()).optional(),
  totalStock: z.number().min(1, "Total stock must be at least 1."),
});
 export type TicketCategoryFormValues = z.infer<typeof ticketFormSchema>;