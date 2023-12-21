"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";
import { MenuIcon } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import Publish from "./publish";
import { Menu } from "./menu";

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
          <Menu.Skeleton />
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

          <div className="flex items-center gap-x-2">
            <Publish document={document} />

            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
