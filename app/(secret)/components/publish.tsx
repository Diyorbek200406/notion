import { useState } from "react";
import { Check, Copy, Globe } from "lucide-react";
import { useMutation } from "convex/react";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PublishProps {
  document: Doc<"documents">;
}

const Publish = ({ document }: PublishProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/preview/${document._id}`;

  const updateFields = useMutation(api.documents.updateFields);

  const onPublish = () => {
    setIsLoading(true);

    const promise = updateFields({ id: document._id, isPublished: true }).finally(() => setIsLoading(false));

    toast.promise(promise, { loading: "Publishing document...", success: "Published document successfully !", error: "Failed to publish document" });
  };

  const onUnPublish = () => {
    setIsLoading(true);

    const promise = updateFields({ id: document._id, isPublished: false }).finally(() => setIsLoading(false));

    toast.promise(promise, { loading: "UnPublishing document...", success: "UnPublished document successfully !", error: "Failed to UnPublish document" });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button size={"sm"} variant={"ghost"}>
          Share
          {document.isPublished && <Globe className="w-4 h-4 ml-2 text-sky-500" />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="end" alignOffset={8} forceMount>
        {!document.isPublished ? (
          <div className="flex flex-col items-center justify-center">
            <Globe className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this document</p>
            <span className="text-xs to-muted-foreground mb-4">Share your work with others</span>

            <Button className="w-full text-sm" size={"sm"} onClick={onPublish} disabled={isLoading}>
              Publish
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="w-4 h-4 animate-pulse text-sky-500" />
              <p className="text-xs font-medium text-sky-500">This note live on web.</p>
            </div>

            <div className="flex items-center">
              <input className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate" disabled value={url} />

              <Button className="rounded-l-none h-8" disabled={copied} onClick={onCopy}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <Button className="w-full text-sm" size={"sm"} onClick={onUnPublish} disabled={isLoading}>
              UnPublish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
