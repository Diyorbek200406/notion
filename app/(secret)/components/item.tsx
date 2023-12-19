"use client";

import { Id } from "@/convex/_generated/dataModel";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ItemProps {
  id?: Id<"documents">;
  label: string;
  level?: number;
  expended?: boolean;
  onExpend?: () => void;
  onClick?: () => void;
  active?: boolean;
  documentIcon?: string;
  icon?: LucideIcon;
}

const Item = ({ label, id, level = 0, expended, onExpend, onClick, active, documentIcon, icon: Icon }: ItemProps) => {
  const { user } = useUser();

  const createDocument = useMutation(api.documents.createDocument);

  const onCreateDocument = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;
    createDocument({ title: "Untitled", parentDocument: id }).then((document) => {
      if (!expended) {
        onExpend?.();
      }
    });
  };

  const handleExpend = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpend?.();
  };

  const ChevronIcon = expended ? ChevronDown : ChevronRight;

  return (
    <div role="button" onClick={onClick} style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }} className={cn("w-full min-h-[27px] flex items-center text-sm py-1 pr-3 group hover:bg-primary/5 text-muted-foreground font-medium", active && "bg-primary/5 text-primary")}>
      {!!id && (
        <div className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1" role="button" onClick={handleExpend}>
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div> : Icon && <Icon />}

      <span className="truncate">{label}</span>

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div className="h-full ml-auto rounded-sm opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600" role="button">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
              <DropdownMenuItem>
                <Trash />
                Delete
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="text-xs text-muted-foreground p-2">Last edited by {user?.fullName}</div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" role="button" onClick={onCreateDocument}>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }} className="flex gap-x-3 py-[3px]">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
