"use client";

import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserBox = () => {
  const { user } = useUser();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-full flex items-center text-sm p-3 hover:bg-primary/5" role="button">
            <div className="flex items-center max-w-[150px] gap-x-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>DE</AvatarFallback>
              </Avatar>

              <span className="text-start font-medium line-clamp-1">{user?.firstName}&apos;s Notion</span>
            </div>

            <ChevronsLeftRight className="h-4 w-4 text-muted-foreground rotate-90 ml-2" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
          <div className="flex flex-col p-2 space-y-4">
            <p className="text-xs font-medium leading-none text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>DE</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1">
                <p className="text-start font-medium line-clamp-1">{user?.firstName}&apos;s Notion</p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
            <SignOutButton>Log Out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBox;
