import React from 'react'
import Link from "next/link"
import { Button } from '../ui/button'
import { SignIn,SignedOut,SignInButton,UserButton ,SignedIn} from '@clerk/nextjs'
import NavItems from './Navitems'
const Headers = () => {
  return (
    <header className='w-full border-b'>
            <div className="wrapper flex items-center justify-between">
        <Link href="/" className='w-36 font-poppins text-xl px-3'>
        Event-Globe
         </Link>
         <nav className='md:flex-between hidden w-full max-w-xs'>
          <NavItems/>
        </nav>
       <SignedIn>
      
       </SignedIn>
         <SignedOut>
            <Button asChild className='rounded-md size="lg"  mx-1 '>
              <Link href="/sign-in">
                Login
              </Link>
              </Button>
          </SignedOut>
      </div>
    </header>
  )
}

export default Headers