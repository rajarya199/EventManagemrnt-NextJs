import React from "react";
import Link from "next/link";
interface CategoryCardProps {
  categoryId:string;
  image: string;
  name: string;
  eventCount: number;
}
const defaultImg="/assets/images/no-event.png"

export const CategoryCard = ({
  categoryId, 
  image,
  name,
  eventCount,
}: CategoryCardProps) => {
  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="cursor-pointer transition-transform hover:scale-105 h-full">
      <div className="rounded-lg bg-white shadow-md overflow-hidden h-full">
        <div className="h-64 w-full overflow-hidden">
          <img
            src={image ? image :defaultImg}
            alt={`${name} category`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{eventCount} Events</p>
        </div>
      </div>
    </div>
    </Link>
    
  );
};
