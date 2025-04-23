"use client"
import React, { useRef,useState,useEffect } from "react";
import { CategoryCard } from "./CategoryCard";
import { getAllCategory } from "@/app/actions/category.action";

import { ChevronLeft, ChevronRight } from "lucide-react";
const categories = [
  {
    name: "Music",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
    eventCount: 150,
  },
  {
    name: "Festival",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60",
    eventCount: 85,
  },
  {
    name: "Expo",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
    eventCount: 45,
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60",
    eventCount: 120,
  },
  {
    name: "Concerts",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&auto=format&fit=crop&q=60",
    eventCount: 95,
  },
  {
    name: "Summits",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60",
    eventCount: 30,
  },
  {
    name: "Conferences",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60",
    eventCount: 75,
  },
  {
    name: "Health",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60",
    eventCount: 40,
  },
  {
    name: "Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
    eventCount: 65,
  },
  {
    name: "IT",
    image:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&auto=format&fit=crop&q=60",
    eventCount: 55,
  },
];

export const CategorySlider = () => {
  const [category, setCategory] = useState<any[]>([]);


   useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getAllCategory();
          if (response.success && response.data) {
            setCategory(response.data);
          } else {
            console.error("Failed to fetch categories");
          }
        } catch (error) {
          console.error("Failed to fetch categories");
        }
      };
      fetchCategories();
    }, []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full bg-primary-50 dark:bg-primary-900 py-12">
      <div className=" wrapper max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Event Categories
        </h2>
        <div className="relative">
          <div
            className="flex overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory gap-4"
            ref={scrollRef}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {category.map((category, index) => (
              <div
                key={category.id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
              >
                <CategoryCard
                categoryId={category.id}
                  image={category.imageUrl[0]}
                  name={category.name}
                  eventCount={category.Event.length}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
