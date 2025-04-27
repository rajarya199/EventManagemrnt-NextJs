import React from 'react'
import { MoreHorizontal,  } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
interface userProps{
    users:any[]
}
const UsersTable = ({users}:userProps) => {
  return (
    <div>
        <Table>
            <TableHeader>
            <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>First Name</TableHead>
                          <TableHead>Last Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Phone Number</TableHead>     
                          <TableHead>Role</TableHead>
                          <TableHead></TableHead>

                        </TableRow>
            </TableHeader>
            <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user.id} className="">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                   {user.fname}
                  </TableCell>
                  <TableCell>
                   {user.lname}
                  </TableCell>
                  <TableCell>
                   {user.email}
                  </TableCell>
                  <TableCell>
                   {user.address}
                  </TableCell>
                  <TableCell>
                   {user.phone || "N/A"}
                  </TableCell>
                  <TableCell>
                   {user.role}
                  </TableCell>
                
                  <TableCell className="text-right">
                    <div className="flex space-x-2">
                      <Link href={`/`}>
                        <button
                          className="text-blue-500 hover:text-green-700 text-2xl"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No users found.
                </TableCell>
              </TableRow>
            )}
            </TableBody>
            

        </Table>
    </div>
  )
}

export default UsersTable