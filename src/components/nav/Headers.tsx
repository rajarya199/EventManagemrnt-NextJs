import React from 'react'
import Link from "next/link"
import { Button } from '../ui/button'
import { SignIn,SignedOut,SignInButton,UserButton ,SignedIn} from '@clerk/nextjs'
import NavItems from './Navitems'
import NavHead from './NavHead'
import MobileNav from './MobileNav'
import Image from 'next/image'
const Headers = () => {
  return (
    <header className='w-full border-b'>
            <div className="wrapper flex items-center justify-between">
        <Link href="/" className='w-36 font-poppins text-xl px-3'>
        <Image src="/assets/icons/logo.svg" alt='logo' width="48" height="28"/>
         </Link>
         <nav className='md:flex-between hidden w-full max-w-xs'>
          <NavHead/>
          <SignedIn>
    
       <NavItems/>
    </SignedIn>
        </nav>
   
    <div className='flex flex-row justify-end gap-3'>
  <SignedIn>
    <div className='flex flex-row gap-3'>
      <UserButton />
      <MobileNav />
    </div>
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