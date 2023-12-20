"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Documents = () => {
  const router = useRouter();
  const { user } = useUser();

  const createDocument = useMutation(api.documents.createDocument);

  const onCreateDocument = () => {
    const promise = createDocument({ title: "Untitled" }).then((documentId) => router.push(`/documents/${documentId}`));
    toast.promise(promise, { loading: "Creating a new blank document...", success: "Created a new blank successfully", error: "Couldn't create a blank document" });
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center space-y-4">
      <Image src={"./note.svg"} alt="logo" width={300} height={300} className="object-cover dark:hidden" />
      <Image src={"./note-dark.svg"} alt="logo" width={300} height={300} className="object-cover hidden dark:block" />

      <h2>Welcome to {user?.firstName}'s document page</h2>

      <Button onClick={onCreateDocument}>
        <Plus className="h-4 w-4 mr-2" />
        Create a blank
      </Button>
    </div>
  );
};

export default Documents;
