"use client"
import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Search } from "lucide-react";
import Image from 'next/image';
import { Input } from "@/src/components/ui/input";

const Items2 = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/allEvents?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div>
      <div className="relative  overflow-hidden ">
      <div className="absolute inset-0 bg-black opacity-45"></div>

        {/* <div className="absolute inset-0 bg-gradient-to-r from-neutral-300 to-primary/60 z-10" /> */}
        <Image
          src={'/assets/images/ktm.jpg'}
          alt="Events banner"
          width={1200}
          height={500}
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-200 mb-4">Find your Next Experiences with us</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
          Discover incredible events near you, create lasting memories. Your next great adventure awaits!

          </p>
       
                <div className="relative w-full max-w-2xl flex md:flex-row flex-col items-stretch justify-center">
            <div className="flex-grow relative md:w-3/4 w-full mb-4 md:mb-0">
              <Input
                type="text"
                placeholder="Search events, locations, or categories..."
                className="w-full h-full pl-10 bg-transparent rounded-lg  text-white md:h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
            </div>
            <button
              onClick={handleSearch}
              className="ml-2 md:ml-4 bg-primary hover:bg-blue-700 text-white py-2 md:py-3 lg:px-8 xl:px-10 rounded-lg md:h-12"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items2;
