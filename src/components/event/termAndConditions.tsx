"use client"
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Pencil } from "lucide-react";
import { updateToc } from "@/app/actions/event.action";
import { on } from "events";
interface EventTocProps {
  eventId: string;
  eventInfo?: { toc?: string[] };
  onUpdateToc: (newToc: string[]) => void; // Callback to update TOC in parent component
}

export default function EventToc({ eventId, eventInfo,onUpdateToc }: EventTocProps) {
  const [toc, setToc] = useState<string[]>(eventInfo?.toc || []);
  const [newTerms, setNewTerms] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition(); // Handle async state
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setToc(eventInfo?.toc || []);
      setNewTerms((eventInfo?.toc || []).join("\n"));
    }
  }, [open, eventInfo]);

  const addTerms = () => {
    const termsArray = newTerms.split("\n").map(term => term.trim()).filter(term => term);
    setToc(termsArray);
  };

  const removeTerm = (index: number) => {
    const updatedToc = toc.filter((_, i) => i !== index);
    setToc(updatedToc);
    setNewTerms(updatedToc.join("\n"));
  };

  const handleSave = () => {
    startTransition(async () => {
      const response = await updateToc(eventId, toc);

      if (response.success) {
        onUpdateToc(toc);
        setOpen(false);
        router.push(`/profile/my-events/${eventId}`);
      } else {
        console.error("Failed to update TOC:", response.message);
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil className="w-5 h-5 text-gray-700" />
            </Button>
          </DialogTrigger>
          <DialogContent className="z-50">
            <DialogHeader>
              <DialogTitle>Edit Terms and Conditions</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={newTerms}
                onChange={(e) => setNewTerms(e.target.value)}
                placeholder="Enter multiple terms, each on a new line"
                className="w-full h-32"
              />
              <Button onClick={addTerms}>Update List</Button>
              <ul className="list-disc pl-5">
                {toc.map((term, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{term}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeTerm(index)}>
                      ✕
                    </Button>
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={handleSave} disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="list-disc list-outside pl-4 marker:text-gray-700">
        {eventInfo?.toc?.map((term, index) => (
          <li key={index} className="text-gray-700">{term}</li>
        )) || <li className="text-gray-500">No terms available</li>}
      </ul>
    </div>
  );
}
