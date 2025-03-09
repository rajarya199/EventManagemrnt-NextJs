"use client"
import React, { useEffect, useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";
const FeaturedEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const featuredEvents = [
    {
      id: 1,
      title: "International Music Festival 2023",
      subtitle: "3 Days of Amazing Performances",
      date: "2023-08-25",
      time: "2:00 PM - 11:00 PM",
      location: "Central Park Arena",
      image:
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Join us for the biggest music festival of the year featuring top international artists.",
      price: "From $99",
      offer: "Early Bird Tickets - 20% OFF",
    },
    {
      id: 2,
      title: "Global Tech Innovation Summit",
      subtitle: "Future of Technology",
      date: "2023-09-15",
      time: "9:00 AM - 6:00 PM",
      location: "Tech Convention Center",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80",
      description:
        "Experience the future of technology with industry leaders and innovative showcases.",
      price: "From $199",
      offer: "Group Booking Discount Available",
    },
    {
      id: 3,
      title: "Food & Culture Festival",
      subtitle: "A Taste of the World",
      date: "2023-08-30",
      time: "11:00 AM - 9:00 PM",
      location: "Riverside Gardens",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Celebrate diversity through food, art, and cultural performances.",
      price: "From $45",
      offer: "Family Package - Kids Enter Free",
    },
  ];
  useEffect(() => {
    let interval:any;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredEvents.length]);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    setIsAutoPlaying(false);
  };
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length,
    );
    setIsAutoPlaying(false);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", {
        month: "short",
      }),
    };
  };
  return (
    <section className="relative bg-gray-900">
      <div className="relative h-[500px] overflow-hidden">
        {featuredEvents.map((event, index) => {
          const date = formatDate(event.date);
          return (
            <div
              key={event.id}
              className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${event.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              </div>
              <div className="absolute top-6 right-4 ">
                <div className="relative">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col w-[100px]">
                    <div className="bg-indigo-600 px-3 py-1 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-white mr-1" />
                      <span className="text-white text-sm font-bold">
                        {date.month}
                      </span>
                    </div>
                    <div className="px-3 py-3 text-center">
                      <span className="text-3xl font-bold text-gray-900 leading-none">
                        {date.day}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 right-0 w-0 h-0 border-t-8 border-l-8 border-l-transparent border-indigo-800" />
                  </div>
                </div>
              </div>
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-2xl text-white ">
                  <h2 className="text-5xl font-bold mb-2">{event.title}</h2>
                  <p className="text-2xl text-indigo-400 mb-4">
                    {event.subtitle}
                  </p>
                  {/* <p className="text-xl text-gray-300 mb-6">
                    {event.description}
                  </p> */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-300">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  {/* <div className="bg-indigo-600 inline-block px-4 py-2 rounded-lg mb-6">
                    <p className="text-white font-semibold">{event.offer}</p>
                  </div> */}
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold">{event.price}</span>
                    <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute bottom-6 left-0 right-0">
          <div className="flex justify-center gap-2">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-indigo-600" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedEvents;
