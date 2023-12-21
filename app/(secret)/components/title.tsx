"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleProps {
  document: Doc<"documents">;
}

export const Title = ({ document }: TitleProps) => {
  const [title, setTitle] = useState(document.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const updateFiels = useMutation(api.documents.updateFields);

  const inputRef = useRef<HTMLInputElement>(null);

  const enableInput = () => {
    setTitle(document.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current?.value?.length);
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateFiels({ id: document._id, title: e.target.value || "Untitled" });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") disableInput();
  };

  return (
    <div className="flex items-center gap-x-2">
      {!!document.icon && <p className="w-4 h-4">{document.icon}</p>}

      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
        />
      ) : (
        <Button className="font-normal h-auto p-1" variant={"ghost"} size={"sm"} onClick={enableInput}>
          <span className="truncate">{document.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-20 h-8 rounded-md" />;
};
