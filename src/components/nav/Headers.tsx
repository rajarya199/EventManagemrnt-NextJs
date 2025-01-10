import React from 'react'
import Link from "next/link"
import { Button } from '../ui/button'
import { SignIn,SignedOut,SignInButton,UserButton ,SignedIn} from '@clerk/nextjs'
import NavItems from './Navitems'
import NavHead from './NavHead'
import MobileNav from './MobileNav'
const Headers = () => {
  return (
    <header className='w-full border-b'>
            <div className="wrapper flex items-center justify-between">
        <Link href="/" className='w-36 font-poppins text-xl px-3'>
        Event-Globe
         </Link>
         <nav className='md:flex-between hidden w-full max-w-xs'>
          <NavHead/>
          <SignedIn>
    
       <NavItems/>
  <UserButton />
  <MobileNav/>
    </SignedIn>
        </nav>
    <div className='flex w-2 justify-end gap-3'>
      <SignedIn>
        <UserButton/>
        <MobileNav/>
      </SignedIn>
    </div>
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