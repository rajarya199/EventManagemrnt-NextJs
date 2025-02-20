"use server"
import { revalidatePath } from 'next/cache'
import { CreateUserParams,UpdateUserParams } from '@/types'
import db from '@/app/lib/db'
import { handleError } from '../lib/utiils'

export const createUser=async(user:CreateUserParams)=>{
    try{
        const newUser=await db.user.create({
        data:user
        });
        return JSON.parse(JSON.stringify(newUser))
    }
    catch(error){
        handleError(error)

    }
}

export async function updateUser(clerkId: string, userData: UpdateUserParams) {
  console.log('hhhhhhhhhh')
  try {
    // Find the existing user by clerkId
    const existingUser = await db.user.findUnique({
      where: { clerkId },
    });

    if (!existingUser) {
      console.error(`User with clerkId ${clerkId} not found`);
      throw new Error('User not found');
    }

    // Update the user's information in the database
    const updatedUser = await db.user.update({
      where: { clerkId },
      data: userData,
    });

    console.log("Updated user:", updatedUser);
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}


export async function getAllUsers(){
    try{
        const users = await db.user.findMany()
        return { success: true, data: users }
    }
    catch(error){
        console.error("unexpected error occured",error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}
