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
          alert("Registered successfully 🎉");
          setOpen(false);
        } else {
          alert(res.message || "Registration failed");
        }
      });
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Enjoy the Event 🎉</h2>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium text-gray-800">Register Your Place !!</h3>
        <p className="text-gray-600">This event is completely free!</p>
        <p className="mt-4 text-sm text-gray-700">
          <strong>{event.eventCapacity}</strong> spots remaining
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-6 bg-green-500 text-white font-semibold px-8 py-2 hover:bg-green-600">
            Register
          </Button>
        </DialogTrigger>

        <DialogContent className="text-center">
          <DialogHeader className="items-center">
            <DialogTitle className="text-2xl">Confirm Your Registration</DialogTitle>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <DialogDescription>
              You're registering for <strong>{event.title}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div>
            <p className="text-lg mt-2">Registration Details:</p>
          </div>

          <div className="mt-4 space-y-2 text-sm text-center">
            <div className="flex justify-center gap-2">
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className="flex justify-center gap-2">
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-semibold">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
            <div className="flex justify-center gap-2">
              <span className="text-gray-600">Event:</span>
              <span className="ml-2 font-semibold">{event.title}</span>
            </div>
            <div className="flex justify-center gap-2">
              <span className="text-gray-600">Intake:</span>
              <span className="ml-2 font-semibold">1</span>
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
