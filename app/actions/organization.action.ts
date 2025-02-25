"use server"
import db from '@/app/lib/db'
import { handleError } from '../lib/utiils';
import { OrganizationFormValues } from '@/src/lib/schema';
export async function addOrganization(orgData:OrganizationFormValues){
    try{
      const formattedContact = orgData.contact ? [orgData.contact] : [];
  
      const newOrganization = await db.organization.create({
          data: {
            name: orgData.name,
            address:orgData.address,
            contact: formattedContact,
            description: orgData.description || null
          },
        });
  
         // Create Organizer Users
      const organizerUsers = orgData.users.map(user => ({
          organizationId: newOrganization.id,
          userId: user.userId,
          role: user.role,
        }));
  
        await db.organizerUser.createMany({
          data: organizerUsers,
          skipDuplicates: true, // Prevent duplicates
        });
        return{success:true,data:newOrganization}
    }
    catch(error){
      console.error('Unexpected error:', error)
      return { success: false, message: 'An unexpected error occurred' }
  
    }
  }


  export async function getAllOrganizations(){
    try{
        const orgdatas = await db.organization.findMany({
          include:{
            OrganizerUsers:true,
          }
        })
        return { success: true, data: orgdatas }
    }
    catch(error){
        console.error("unexpected error occured",error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}