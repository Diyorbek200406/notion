"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { Loader } from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./title";

interface NavbarProps {
  isCollapse: boolean;
  reset: () => void;
}

const Navbar = ({ isCollapse, reset }: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getDocumentById, { id: params.documentId as Id<"documents"> });

  if (document === undefined) {
    return (
      <nav className="w-full bg-background p-2 flex items-center justify-between">
        <Title.Skeleton />

        <div className="flex items-center gap-x-2">
          <Loader />
        </div>
      </nav>
    );
  }

  if (document === null) return null;

  return (
    <>
      <nav className={"w-full bg-background p-2 flex items-center justify-between gap-x-4"}>
        {isCollapse && <MenuIcon className="w-6 h-6 text-muted-foreground" role="button" onClick={reset} />}

        <div className="w-full flex items-center justify-between">
          <Title document={document} />

          <div className="flex items-center gap-x-2"></div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
