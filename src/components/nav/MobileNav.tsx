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
          <SheetTrigger asChild className="align-middle p-2">
            <Image 
              src="/assets/icons/menu.svg"
              alt="menu"
              width={36}
              height={36}
              className="cursor-pointer"
            />
            
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
            {/* <Image 
              src="/assets/images/logo.svg"
              alt="logo"
              width={128}
              height={38}
            /> */}
            <h2>Event-Globe</h2>
            <Separator className="border border-gray-50" />
            <NavItems />
          </SheetContent>
        </Sheet>
      </nav>
    )
  }
  
  export default MobileNav