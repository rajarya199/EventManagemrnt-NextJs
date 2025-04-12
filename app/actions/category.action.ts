"use server"
import { z } from "zod";
import { revalidatePath } from 'next/cache'
import { EventCategoryType } from '@/types'
import db from '@/app/lib/db'
import { handleError } from '../lib/utiils'
import { categorySchema } from '@/src/lib/schema'
import { CategoryType } from "@/types";
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

  export async function getCategoryDetail(id: string) {
    try {
      const category = await db.category.findUnique({
        where: { id },
        include:{
          Event:true,
        }
      })
      if (!category) {
        return { success: false, message: 'Category not found' }
      }
  
      return { success: true, data: category }
    } catch (error) {
      console.error('Unexpected error:', error)
      return { success: false, message: 'An unexpected error occurred' }
    }
  }

  export async function updateCategory(categoryId:string,data:CategoryType){
    try{
      const category = await db.category.findUnique({
        where: { id: categoryId },
      });
  
      if (!category) {
        return { success: false, message: "Category not found" };
      }
  
      // Check if the category name is unique
      const duplicateCategory = await db.category.findFirst({
        where: {
          name: data.name,
          id: { not: categoryId },
        },
      });
  
      if (duplicateCategory) {
        return { success: false, message: "Category name must be unique" };
      }
      const updatedCategory = await db.category.update({
        where: { id: categoryId },
        data: {
          name: data.name,
          categoryDescription: data.categoryDescription,
          imageUrl: data.imageUrl|| category.imageUrl
        },
      });
      revalidatePath("/dashboard/categories");
      return { success: true, data: updatedCategory };
    }
    catch(error){
      handleError(error)
      return { success: false, message:"Error saving category"};

    }
    

  }

  export async function getEventByCategory(id: string) {
    try {
      const category = await db.category.findUnique({
        where: { id },
        include:{
          Event:true,
        }
      })
      if (!category) {
        return { success: false, message: 'Category not found' }
      }
  
      return { success: true, data: category }
    } catch (error) {
      console.error('Unexpected error:', error)
      return { success: false, message: 'An unexpected error occurred' }
    }
  }