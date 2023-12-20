import { Search, Trash, Undo } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import ConfirmModal from "@/components/modals/confirm-modal";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();

  const archivedDocuments = useQuery(api.documents.getTrashDocuments);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  if (archivedDocuments === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Loader size={"lg"} />
      </div>
    );
  }

  const filteredDocuments = archivedDocuments.filter((document) => document.title.toLowerCase().includes(search.trim().toLowerCase()));

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, { loading: "Remove a document...", success: "Remove a document successfully !", error: "Failed to remove document" });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />

        <Input className="h-7 px-2 focus-visible:ring-transparent bg-secondary" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter by page title..." />
      </div>

      <div className="mt-2 p-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">No documents in trash</p>

        {filteredDocuments.map((archivedDocument, index) => (
          <div key={index} className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between text-primary" role="button">
            <span className="truncate p-2">{archivedDocument.title}</span>

            <div className="flex items-center">
              <div className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600" role="button">
                <Undo className="h-5 w-5 text-muted-foreground" />
              </div>

              <ConfirmModal onConfirm={() => onRemove(archivedDocument._id)}>
                <div className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600" role="button">
                  <Trash className="h-5 w-5 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
