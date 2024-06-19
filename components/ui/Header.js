import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import HamburgerMenu from "./HamburgerMenu";

import { SidebarProvider } from "@/context/SidebarContext";

import { FaArrowAltCircleRight } from "react-icons/fa";
import { MdLogout, MdLogin } from "react-icons/md";
import {
  FaPenToSquare,
  FaXmark,
  FaRegCircleUser,
  FaCircleUser,
  FaGear,
} from "react-icons/fa6";

import Link from "next/link";

export default function Header({
  handleCreateButton,
  isCreatingNewDocs,
  setIsCreatingNewDocs,
  isAuthenticated,
  currentUser,
  logout,
}) {
  const router = useRouter();
  function goToHomePage() {
    router.push("/");
    setIsCreatingNewDocs(false);
  }

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenu = useRef();

  function toggleUserMenu() {
    setIsUserMenuOpen((prevState) => !prevState);
  }

  function closeToggleableElements(e) {
    if (userMenu.current && !userMenu.current.contains(e.target)) {
      setIsUserMenuOpen(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("click", closeToggleableElements);
    }

    return () => {
      document.removeEventListener("click", closeToggleableElements);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 flex h-[4.5rem] items-center justify-between px-4 w-full shadow-sm border-b bg-gray-50">
      <div className="relative flex items-center">
        {/* HamburgerMenu */}
        {router.pathname.startsWith("/documentation/") && <HamburgerMenu />}

        {/* Logo */}
        <button onClick={goToHomePage}>
          <div className="flex items-center gap-1">
            <img className="w-8 h-auto sm:w-10" src={"/logo.png"} />
            <h1 className="text-2xl text-teal-900 font-extrabold">
              <span className="text-teal-500">Docu</span>
              Tech
            </h1>
          </div>
        </button>
      </div>

      <div ref={userMenu} className="relative flex items-center gap-2 md:gap-4">
        {/* User */}
        {isAuthenticated && (
          <button type="button" onClick={toggleUserMenu}>
            <FaRegCircleUser className="cursor-pointer text-[1.75rem] text-teal-500 sm:text-3xl" />
            <span className="opacity-0 invisible absolute top-[105%] right-0 px-2 py-1 text-xs bg-teal-900 rounded-md group-hover:opacity-100 group-hover:visible transition-all duration-300">
              User Account
            </span>
          </button>
        )}
        <div
          className={`absolute top-[125%] right-0 w-72 bg-gray-50 rounded-lg drop-shadow-lg transition-all duration-300 ${
            isUserMenuOpen ? "h-40 py-2 visible" : "h-0 invisible"
          } overflow-hidden`}
        >
          <div className="flex flex-col h-full justify-between">
            <div onClick={() => setIsUserMenuOpen(false)}>
              {isAuthenticated ? (
                <Link
                  href={"/user/profile"}
                  className="flex items-center px-4 py-2 gap-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-center size-5 bg-teal-500 text-white rounded-full p-3.5">
                    <span>{currentUser && currentUser[0]}</span>
                  </div>
                  <span>{currentUser}</span>
                </Link>
              ) : (
                <span className="flex items-center px-4 py-2 gap-1.5">
                  <FaCircleUser className="text-2xl" />
                  <span>Guest</span>
                </span>
              )}

              {isAuthenticated && (
                <Link
                  href={"/user/manage-documentation"}
                  className="flex items-center px-4 py-2 gap-1.5 cursor-pointer"
                >
                  {" "}
                  <FaGear />
                  <span>Manage Documentation</span>
                </Link>
              )}
            </div>

            <div className="border-t">
              {isAuthenticated ? (
                <a
                  onClick={logout}
                  className="flex items-center px-4 py-2 gap-1 text-red-500 cursor-pointer"
                >
                  <MdLogout className="text-lg" />
                  <span>Logout</span>
                </a>
              ) : (
                <Link
                  href={"/login"}
                  className="flex items-center px-4 py-2 gap-1 cursor-pointer text-teal-500"
                >
                  <MdLogin className="text-lg" />
                  <span>Login</span>
                </Link>
              )}

              <div className="px-4 mt-2 text-xs text-gray-400">
                &copy; DocuTech 2024. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        {isAuthenticated && (
          <div onClick={() => setIsUserMenuOpen(false)}>
            <button
              onClick={handleCreateButton}
              className={`relative group flex items-center px-2.5 py-[0.5rem] gap-1 rounded-md text-gray-50 sm:px-4 sm:py-2.5 ${
                isCreatingNewDocs ? "bg-[#e64942]" : "bg-teal-500"
              }`}
            >
              <span className="hidden font-semibold sm:inline-block">
                {isCreatingNewDocs ? "Cancel" : "Create"}
              </span>

              {isCreatingNewDocs ? (
                <FaXmark className="text-base sm:text-lg" />
              ) : (
                <>
                  <FaPenToSquare className="text-base sm:text-lg" />
                  {/* tooltip */}
                  <span className="inline-block opacity-0 invisible absolute top-[105%] right-0 px-2 py-1 text-xs bg-teal-900 rounded-md group-hover:opacity-100 group-hover:visible transition-all duration-300 sm:hidden">
                    Create new documentation
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {!isAuthenticated && (
          <div onClick={() => setIsUserMenuOpen(false)}>
            <Link
              href={"/login"}
              className="flex items-center px-2.5 py-[0.5rem] gap-1 rounded-md text-gray-50 sm:px-4 sm:py-2.5 bg-teal-500"
            >
              <span className="font-semibold">Get Started</span>
              <FaArrowAltCircleRight className="text-lg" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
