import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/src/components/ui/sheet"
  import Image from "next/image"
  import NavItems from "@/src/components/nav/Navitems"
  import { Separator } from "@/src/components/ui/separator"
  
  
  const MobileNav = () => {
    return (
      <nav className="md:hidden">

        <Sheet>
          <SheetTrigger className="align-middle">
            
            <Image 
              src="/assets/icons/menu.svg"
              alt="menu"
              width={36}
              height={36}
              className="cursor-pointer "
              style={{ boxSizing: 'content-box' }} 
            />
          
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
             <Image 
              src="/assets/icons/logo2.png"
              alt="logo"
              width={68}
              height={38}
            /> 
            <Separator className="border border-gray-50" />
            <NavItems />
          </SheetContent>
        </Sheet>
      </nav>
    )
  }
  
  export default MobileNav