"use client";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { UseScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = UseScrolled();

  return (
    <div className={cn("w-full fixed top-0 z-50 bg-background flex items-center justify-between p-6", scrolled && "border-b shadow-lg")}>
      <Logo />
      <div className="flex items-center gap-x-2">
        {isLoading && <Loader />}

        {!isLoading && !isAuthenticated && (
          <>
            <SignInButton mode="modal">
              <Button size={"sm"} variant={"ghost"}>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Notion Free</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Link href={"/documents"}>
              <Button size={"sm"} variant={"ghost"}>
                Enter Notion
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};
