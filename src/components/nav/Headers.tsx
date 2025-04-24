"use client"
import React from 'react'
import Link from "next/link"
import { Button } from '../ui/button'
import { SignIn,SignedOut,SignInButton,UserButton ,SignedIn,useUser} from '@clerk/nextjs'
import NavItems from './Navitems'
import NavHead from './NavHead'
import MobileNav from './MobileNav'
import Image from 'next/image'
import ThemeSwitcher from "@/src/components/theme/ThemeSwitcher";

const DashIcon=()=>{
  return(
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"  
    strokeLinecap="round" 
    strokeLinejoin="round"  
>
  <rect x="3" y="3" width="7" height="9" rx="1"/>
  <rect x="14" y="3" width="7" height="5" rx="1"/>
  <rect x="14" y="12" width="7" height="9" rx="1"/>
  <rect x="3" y="16" width="7" height="5" rx="1"/>
</svg>



  )
}
const Headers = () => {
  const { user } = useUser(); 
  const userRole = user?.publicMetadata?.userRole
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
    <UserButton>
                <UserButton.MenuItems>
                  {userRole === "Admin" && ( 
                    <UserButton.Link
                      label="Dashboard"
                      labelIcon={<DashIcon />}
                      href="/dashboard"
                    />
                  )}
                </UserButton.MenuItems>
              </UserButton>
      <MobileNav />
    </div>
  </SignedIn>
  <ThemeSwitcher/>
  <SignedOut>
            <Button asChild className='rounded-md size="lg"  mx-1 '>
              <Link href="/sign-in">
                Login
              </Link>
              </Button>
          </SignedOut>
</div>

         
          
      </div>
    </header>
  )
}

export default Headers