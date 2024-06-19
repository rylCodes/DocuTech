import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function toggleSidebar() {
    setIsSideBarOpen((prevState) => !prevState);
  }

  return (
    <SidebarContext.Provider value={{ isSideBarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
