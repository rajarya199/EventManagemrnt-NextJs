"use client"
import { getEventByCategory } from '@/app/actions/category.action'
import { CalendarIcon, HistoryIcon, CalendarCheckIcon } from 'lucide-react'

import React,{useEffect,useState} from 'react'
interface catProps{
    categoryId:string
}
const defaultImg="/assets/images/img5.png"
const defImg="/assets/images/img4.jpg"

const CategoryPage = ({categoryId}:catProps) => {
    const[category,setCategory]=useState<any>('')
    const[loading,setLoading]=useState<boolean> (true)

     useEffect(() => {
          const fetchData = async () => {
            setLoading(true);

            try {
              const response = await getEventByCategory(categoryId);
              if (response.success && response.data) {
                setCategory(response.data);
              } else {
                console.error("Failed to fetch categories event");
              }
            } catch (error) {
              console.error("Failed to fetch categories");
            }
            finally{
                setLoading(false)
            }
          };
          fetchData();
        }, [categoryId]);
        if (loading || !category) {
            return (
                <div className="flex justify-center items-center my-20 h-full">
                    loading...
                </div>
            );
        }

        const currentTime = new Date();
        const events = category.Event;
      
        const upcomingEvents = events.filter(
          (event:any) =>
            new Date(event.startTime) >= currentTime ||
            (new Date(event.startTime) <= currentTime &&
              new Date(event.endTime) >= currentTime)
        );
      
        const comingEventCount = upcomingEvents.length;
        const pastCount = events.length - comingEventCount;
        const bannerImage = category.imageUrl?.[0] || defaultImg;
        const catImg=category.imageUrl?.[0] || defImg;

  return (
    <div>
        <div className='relative'>
        <div className="h-80 sm:h-96 w-full overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-50 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
              <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                  <img

                    src={catImg}
                    alt={`${category.name} category`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {category.name}
                  </h1>
                  {/* Stats Section */}
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="text-center">
                      <div className="flex items-center justify-center  text-white mb-1">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span className="text-2xl font-bold">
                        {events.length}

                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">Total Events</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center  text-white mb-1">
                        <CalendarCheckIcon className="h-4 w-4 mr-2" />
                        <span className="text-2xl font-bold">
                        {comingEventCount}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">Upcoming-Live</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-white mb-1">
                        <HistoryIcon className="h-4 w-4 mr-2" />
                        <span className="text-2xl font-bold">
                        {pastCount}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">Past Events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-gray-600 text-lg">{category.categoryDescription}</p>
      </div>
    </div>
  )
}

export default CategoryPage