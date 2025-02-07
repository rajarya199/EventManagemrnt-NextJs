"use server"
import { z } from "zod";
import { revalidatePath } from 'next/cache'
import { EventCategoryType } from '@/types'
import db from '@/app/lib/db'
import { handleError } from '../lib/utiils'
import { categorySchema } from '@/src/lib/schema'
export const saveCategory = async (data:EventCategoryType) => {
    try {
      const existingCategory = await db.category.findFirst({
        where: { name: data.name },
      });
  
      if (existingCategory) {
        return { success: false, message: "Category must be unique" };
      }
  
      const newCategory = await db.category.create({
        data: {
          name: data.name,
          categoryDescription: data.categoryDescription,
        },
      });
  
      return newCategory;
    } catch (error) {
      handleError(error);
      return { success: false, message: "Error saving category" };
    }
  };

  export async function getAllCategory() {
    try{
      const categories = await db.category.findMany({
          include:{
              Event:true
          }
    });
      return { success: true, data: categories };
    }catch(error){
      console.error("Error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }

  export const addCategory=async(data:z.infer<typeof categorySchema>)=>{
try{
  const existingCategory = await db.category.findFirst({
    where: { name: data.name },
  });

  if (existingCategory) {
    return { success: false, message: "Category must be unique" };
  }
  const newCategory = await db.category.create({
    data: {
      name: data.name,
      categoryDescription: data.categoryDescription,
      imageUrl:data.imageUrl
    },
  });
  return { success: true, data: newCategory };

}
catch(error){
  handleError(error)
  return { success: false, message:"Error saving category"};
}
  }