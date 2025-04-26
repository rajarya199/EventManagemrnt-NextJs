"use client"
import React,{useState,useEffect} from "react";
import { MoreHorizontal, Search, Filter } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import Link from "next/link";
import { getAllCategory } from "@/app/actions/category.action";
export const CategoryTable = () => {
  const [category, setCategory] = useState<any[]>([]);
  const[searchQuery,setSearchQuery]=useState("")

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
  const categories = [
    {
      id: 1,
      name: "Music Concerts",
      description: "Live music performances and concerts",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      eventCount: 125,
    },
    {
      id: 2,
      name: "Tech Conferences",
      description: "Technology and innovation conferences",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      eventCount: 89,
    },
    
  ];
  const filteredCategory=category.filter(category=>
    category.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  )
  return (
    <div className="bg-white dark:bg-primary-600 rounded-lg border shadow-sm border-gray-100  dark:border-gray-600">
      <div className="p-4 border-b border-gray-100  dark:border-gray-500 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        <Link href='/dashboard/categories/add'>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Category
        </button>
        </Link>
     
      </div>
      <div className="overflow-x-auto">
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Events</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategory.map((category,index) => (
              <TableRow key={category.id} className="">
                <TableCell>{index+1}</TableCell>
                <TableCell>
                  <img
                    src={category.imageUrl[0]}
                    alt={category.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="max-w-xs truncate">{category.categoryDescription}</TableCell>
               
                <TableCell>{category.Event.length}</TableCell>
                <TableCell className="text-right">
                <div className="flex space-x-2">
                    <Link href={`/dashboard/categories/update/${category.id}`}>
                    <button
                      className="text-blue-500 hover:text-green-700 text-2xl"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    </Link>
                    <button className="text-gray-400 dark:text-gray-300 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
