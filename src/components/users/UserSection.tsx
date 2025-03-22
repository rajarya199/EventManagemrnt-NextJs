"use client"
import React,{useState,useEffect} from 'react'
import { MoreHorizontal, Search, Filter } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getAllUsers } from '@/app/actions/user.actions';
import UsersTable from './UsersTable';
const UserSection = () => {
  const[users,setUsers]=useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await getAllUsers();
            if (response.success && response.data) {
              setUsers(response.data);
            } else {
              console.error("Failed to fetch users");
            }
          } catch (error) {
            console.error("Failed to fetch users");
          }
        };
        fetchUsers();
      }, []);

      const filterUsers=users.filter((user)=>
      user.fname.toLowerCase().includes(searchQuery.toLocaleLowerCase())||
      user.lname.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
  return (
    <div>
             <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
       
     
      </div>
      <UsersTable users={filterUsers}/>
    </div>
  )
}

export default UserSection