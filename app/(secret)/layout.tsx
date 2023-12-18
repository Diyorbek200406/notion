"use client";

import { Loader } from "@/components/ui/loader";
import { ChildProps } from "@/types";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Sidebar from "./components/sidebar";

const Layout = ({ children }: ChildProps) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="w-full flex">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
