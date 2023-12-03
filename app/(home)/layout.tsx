"use client";

import { ChildProps } from "@/types";
import { Navbar } from "./components";

const HomeLayout = ({ children }: ChildProps) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="w-full pt-40">{children}</main>
    </div>
  );
};

export default HomeLayout;
