"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

const Sidebar = () => {
  const sidebarRef = useRef<ElementRef<"div">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const isResizing = useRef(false);

  const [isCollapse, setIsCollapse] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapse(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.width = "100%";
      navbarRef.current.style.left = "0";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const reset = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapse(false);
      setIsResetting(true);
      sidebarRef.current.style.width = "240px";
      navbarRef.current.style.width = "calc(100% - 240px)";
      navbarRef.current.style.left = "240px";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 500) newWidth = 500;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
      navbarRef.current.style.left = `${newWidth}px`;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div className={cn("group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-50", isResetting && "transition-all ease-in duration-300")} ref={sidebarRef}>
        <div className="w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 absolute right-2 top-3 dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100 transition" role="button" onClick={collapse}>
          <ChevronsLeft className="w-6 h-6" />
        </div>

        <div className="absolute h-full w-1 right-0 top-0 cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition" onMouseDown={handleMouseDown} />
      </div>

      <div className={cn("absolute top-0 z-50 left-60 w-[calc(100% - 240px)]", isResetting && "transition-all ease-in duration-300")} ref={navbarRef}>
        <nav className="bg-transparent p-2 w-full">{isCollapse && <MenuIcon className="w-6 h-6 text-muted-foreground" role="button" onClick={reset} />}</nav>
      </div>
    </>
  );
};

export default Sidebar;
