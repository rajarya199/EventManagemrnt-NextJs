"use server"
import { revalidatePath } from 'next/cache'
import { CreateUserParams } from '@/types'
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
