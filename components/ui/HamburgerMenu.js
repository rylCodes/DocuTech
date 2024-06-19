import { useSidebar } from "@/context/SidebarContext";
import React from "react";

export default function HamburgerMenu() {
  const { isSideBarOpen, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      type="button"
      className="inline-block relative h-4 w-6 mr-4 outline-offset-8 outline-1 focus:outline rounded-sm lg:hidden"
    >
      <span
        className={`absolute left-0 translate-y-1/2 bg-gray-800 h-[0.15rem] w-full transition-all duration-300 ${
          isSideBarOpen ? "rotate-45 bottom-1/2" : "bottom-full"
        }`}
      ></span>
      <span
        className={`absolute bottom-1/2 left-0 translate-y-1/2 bg-gray-800 h-[0.15rem] w-full ${
          isSideBarOpen && "opacity-0"
        }`}
      ></span>
      <span
        className={`absolute  left-0 translate-y-1/2 bg-gray-800 h-[0.15rem] w-full transition-all duration-300 ${
          isSideBarOpen ? "-rotate-45 bottom-1/2" : "bottom-0"
        }`}
      ></span>
    </button>
  );
}
