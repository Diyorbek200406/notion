"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import Item from "./item";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const [expended, setExpended] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const params = useParams();

  const onExpend = (documentId: string) => {
    setExpended((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const documents = useQuery(api.documents.getDocuments, { parentDocument: parentDocumentId });

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p className={cn("hidden text-sm font-medium text-muted-foreground/80", expended && "last:block", level === 0 && "hidden")} style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}>
        No documents found.
      </p>
      {documents.map((document, index) => (
        <div key={index}>
          <Item key={index} id={document._id} label={document.title} level={level} expended={expended[document._id]} onExpend={() => onExpend(document._id)} onClick={() => onRedirect(document._id)} active={params.documentId == document._id} documentIcon={document?.icon} />
          {expended[document._id] && <DocumentList parentDocumentId={document._id} level={level + 1} />}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
