import AboutComp3 from "@/src/components/about/AboutComp3";
import JoinUs from "@/src/components/about/JoinUs";
import OurValue from "@/src/components/about/OurValue";
import { CategorySlider } from "@/src/components/category/CategorySlider";
import EventsCard from "@/src/components/hero/EventsCard";
import FeaturedEvents from "@/src/components/hero/FeatureSection";
import Items1 from "@/src/components/hero/Items1";
import Items2 from "@/src/components/hero/Items2";
import PastEventCard from "@/src/components/hero/PastEventCard";
import Testimonial from "@/src/components/hero/Testimonial";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";


export default function Home() {
  return (
    <>
    <Items2/>
         <section className=" bg-primary-50 dark:bg-primary-900 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 ">
            <h1 className="h1-bold">We're On Mission To Bring People Together</h1>
            <p className="p-regular-20 md:p-regular-24">Lasting impressions are our bread and butter, and our mission is to transform visions into reality. We’re committed to exceptional service and aim to make every event a memorable occasion.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/events">
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
     {/* <FeaturedEvents/> */}
     <section className="wrapper bg-primary-50 dark:bg-primary-900">
     <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold p-2"> Events</h2>
    <Link href="/events" className="text-blue-600 hover:text-blue-800 flex items-center">
      <span className="mr-1">See More</span>
      <ChevronsRight size={14} />
    </Link>
  </div>
      <EventsCard/>
     </section>

     <section className="wrapper bg-primary-50 dark:bg-primary-900">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold p-2">Past Events</h2>
    <Link href="/past-event" className="text-blue-600 hover:text-blue-800 flex items-center">
      <span className="mr-1">See More</span>
      <ChevronsRight size={14} />
    </Link>
  </div>
  <PastEventCard />
</section>

     <div className="w-full bg-primary-50 dark:bg-primary-900">
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
