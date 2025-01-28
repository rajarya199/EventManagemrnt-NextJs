import AboutComp3 from "@/src/components/about/AboutComp3";
import JoinUs from "@/src/components/about/JoinUs";
import OurValue from "@/src/components/about/OurValue";
import { CategorySlider } from "@/src/components/category/CategorySlider";
import Items1 from "@/src/components/hero/Items1";
import Testimonial from "@/src/components/hero/Testimonial";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Items1/>
         <section className=" bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 ">
            <h1 className="h1-bold">We're On Mission To Bring People Together</h1>
            <p className="p-regular-20 md:p-regular-24">Lasting impressions are our bread and butter, and our mission is to transform visions into reality. We’re committed to exceptional service and aim to make every event a memorable occasion.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/main.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] rounded-md  object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
     </section> 
     <div className="w-full bg-primary-50">
      <CategorySlider />
    </div>
    <div className="bg-primary-50">
    <OurValue/>

    <Testimonial/>
      <AboutComp3/>
      <JoinUs/>
    </div>
     
      
    </>
  );
}
