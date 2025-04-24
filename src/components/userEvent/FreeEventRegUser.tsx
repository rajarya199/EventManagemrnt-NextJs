"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getFreeEventRegUsers } from "@/app/actions/eventRegUser.action";
interface eventParam {
  eventId: string;
}
const FreeEventRegUser = ({ eventId }: eventParam) => {
  const [regUsers, setRegUsers] = useState<any[]>([]);
  useEffect(() => {
    const fetchRegUser = async () => {
      const response = await getFreeEventRegUsers(eventId);
      if (response.success && response.data) {
        setRegUsers(response.data);
      }
    };
    fetchRegUser();
  }, [eventId]);
  return (
    <div>
      <div className="p-6 bg-white dark:bg-primary-600 shadow-sm rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Event Registrations</h2>
        {regUsers.length === 0 ? (
          <p>No registrations for this Event yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Types</TableHead>
                <TableHead>Intake</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regUsers.map((reg, index) => (
                <TableRow key={reg.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>  {reg.User.fname} {reg.User.lname} </TableCell>
                  <TableCell>    {reg.User.email}</TableCell>
                  <TableCell>Free Event</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>{reg.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default FreeEventRegUser;
