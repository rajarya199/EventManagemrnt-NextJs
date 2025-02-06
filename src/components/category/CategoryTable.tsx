import React from "react";
import { MoreHorizontal, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
export const CategoryTable = () => {
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
  return (
    <div className="bg-white rounded-lg border shadow-sm border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Category
        </button>
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
            {categories.map((category) => (
              <TableRow key={category.id} className="hover:bg-gray-50">
                <TableCell>#{category.id}</TableCell>
                <TableCell>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-8 w-8 rounded object-cover"
                  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="max-w-xs truncate">{category.description}</TableCell>
               
                <TableCell>{category.eventCount}</TableCell>
                <TableCell className="text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
