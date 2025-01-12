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