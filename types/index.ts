// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    fname: string
    lname: string
    email: string
    image: string
  }

  export type EventCategoryType={
    name:string
    categoryDescription:string
  }
   export type CategoryType={
    name:string
    categoryDescription:string
    imageUrl:string[]
   }