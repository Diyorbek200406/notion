"use client";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { UseScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const scrolled = UseScrolled();

  return (
    <div className={cn("w-full fixed top-0 z-50 bg-background flex items-center justify-between p-6", scrolled && "border-b shadow-lg")}>
      <Logo />
      <div className="flex items-center gap-x-2">
        <Button size={"sm"} variant={"ghost"}>
          Login
        </Button>
        <Button size={"sm"}>Get Notion Free</Button>
        <ModeToggle />
      </div>
    </div>
  );
};
