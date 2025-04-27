import React from "react";
import { MoreHorizontal } from "lucide-react";
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
} from "@/src/components/ui/table";
interface orgProps {
  organizers: any[];
}
const OrganizerTable = ({ organizers }: orgProps) => {
  return (
    <div className="dark:bg-primary-600">
      <Table className="w-full border-collapse border shadow rounded">
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizers.length > 0 ? (
            organizers.map((org, index) => (
              <TableRow key={org.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  {org.User.fname} {org.User.lname}
                </TableCell>
                <TableCell>{org.Event[0].title}</TableCell>

                <TableCell>{org.isIndividual ? "Individual":"Organization"}</TableCell>
                <TableCell>{org.User.email}</TableCell>


              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500">
                No Organizer found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrganizerTable;
