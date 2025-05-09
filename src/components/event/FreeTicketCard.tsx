"use client";
import React, { useState, useTransition } from "react";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";

import { useUser } from "@clerk/nextjs";
import { saveRegistration } from "@/app/actions/freeEventRegistration.action";
interface FreeTicketCardProps {
  event: any;
}

const FreeTicketCard = ({ event }: FreeTicketCardProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const userId = user?.publicMetadata?.userId as string;
  const eventId = event?.id;

  const handleConfirm = () => {
    startTransition(() => {
      saveRegistration({ userId, eventId }).then((res) => {
        if (res.success) {
                    toast.success("Registered successfully 🎉");
          
          // alert("Registered successfully 🎉");
          setOpen(false);
        } else {
          toast.warning(res.message || "Registration failed")
          // alert(res.message || "Registration failed");
        }
      });
    });
  };
const takenPlace=event.FreeEventRegistrations.length
const availablePlace=event.eventCapacity -takenPlace
  return (
    <div className="bg-white dark:bg-primary-600 rounded-lg border border-gray-200 p-6 shadow-sm text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Enjoy the Event 🎉</h2>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Register Your Place !!</h3>
        <p className="text-gray-600 dark:text-gray-300">This event is completely free!</p>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <strong>{availablePlace} /{event.eventCapacity}</strong> spots remaining
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-6 bg-green-500 text-white font-semibold px-8 py-2 hover:bg-green-600">
            Register
          </Button>
        </DialogTrigger>

        <DialogContent >
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-2xl">Confirm Your Registration</DialogTitle>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <DialogDescription>
              You're registering for <strong>{event.title}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="text-center mt-2">
            <p className="text-lg" >Registration Details:</p>
          </div>

          <div className="mt-4 space-y-2 text-sm px-4 ">
            <div className="flex  gap-2 ">
              <span className="text-gray-500 dark:text-gray-400">Name:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className="flex  gap-2">
              <span className="text-gray-600 dark:text-gray-300">Email:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100  ">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
            <div className="flex  gap-2">
              <span className="text-gray-600 dark:text-gray-300">Event:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100 ">{event.title}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600 dark:text-gray-300">Intake:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100 ">1</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center w-full gap-6">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-green-600 text-white w-full hover:bg-green-700"
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FreeTicketCard;
