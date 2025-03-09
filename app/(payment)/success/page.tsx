"use client";

import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched session data:", data); // Debugging
          setSessionData(data);
        });
    }
  }, [sessionId]);

  if (!sessionData) return <p>Loading payment details...</p>;

  // Ensure `line_items` is an array before mapping
  const lineItems = sessionData?.line_items?.data || [];

  return (
    <div className=" my-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600">🎉 Payment Successful!</h1>
      <p className="mt-2 text-gray-700">Thank you for booking your tickets.</p>

      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold">Ticket Summary</h2>
        {lineItems.length > 0 ? (
          lineItems.map((item: any) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>{item.description} (x{item.quantity})</span>
              <span>${(item.amount_total / 100).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No ticket details available.</p>
        )}
        <div className="flex justify-between font-bold mt-2">
          <span>Total Paid:</span>
          <span>${(sessionData.amount_total / 100).toFixed(2)}</span>
        </div>
      </div>

      {/* <p className="mt-4 text-gray-500">Order ID: {sessionData.id}</p> */}
      <Separator className="my-2" />

      <div className=" mt-2 bg-muted p-4 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="space-y-1">
            <li>• Your e-tickets will be available in your account</li>
            <li>• Please bring your ID to the event for verification</li>
            <li>• For any questions, please contact our support team</li>
          </ul>
        </div>
      {/* <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Download E-Ticket
      </button> */}
      <Button className="w-full mt-4 px-4 bg-blue-500 hover:bg-blue-700" >
          Return to Event
        </Button>
    </div>
  );
};

export default SuccessPage;
