
import ProfileEventPage from "@/src/components/event/ProfileEventPage"
import { MyEventsContent } from "@/src/components/event/UserEvent"
import type { Metadata } from "next"
import { auth } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  title: "My Events | EventGlobe",
  description: "Manage your created events",
}

export default async function MyEventsPage() {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.id as string;
  return (
    // <div className="container mx-auto py-10">
    //   <h1 className="text-3xl font-bold mb-6">My Events</h1>
    //   <MyEventsContent/>
    // </div>
    <div className="bg-primary-50 min-h-screen">
      <div className="wrapper">
      <ProfileEventPage userId={userId}/>

      </div>
    </div>
  )
}