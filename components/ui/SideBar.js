import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { server } from "@/config";
import axios from "/node_modules/axios/index";
import {
  FaGears,
  FaLaptopCode,
  FaScrewdriverWrench,
  FaTabletScreenButton,
  FaBookOpenReader,
  FaLightbulb,
  FaBox,
  FaArrowDown,
} from "react-icons/fa6";
import { useSidebar } from "@/context/SidebarContext";

export default function SideBar() {
  const router = useRouter();
  const [documentation, setDocumentation] = useState(null);
  const { isSideBarOpen, toggleSidebar } = useSidebar();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    async function getDocumentation() {
      if (router.isReady) {
        const slug = router.query.slug;
        try {
          const response = await axios.get(
            server + `/api/documentations/slug/${slug}`
          );
          const documentation = await response.data.data;
          setDocumentation(documentation);
        } catch (error) {
          console.error("Failed to fetch a documentation", error);
          return;
        }
      }
    }

    getDocumentation();
  }, [router.isReady, router.query.slug, router?.pathname]);

  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window?.location.hash);
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const contentList = useMemo(() => {
    const headers = documentation?.content.filter(
      (content) => content.type === "Header"
    );

    return headers?.map((header, index) => (
      <li
        key={index}
        className={`pl-4 py-2 border-l-[3px] ${
          currentHash === "#" + header.text.split(" ").join("-").toLowerCase()
            ? "border-teal-500"
            : "border-[rgba(20,184,166,0.2)]"
        }`}
      >
        <a
          onClick={toggleSidebar}
          href={
            header.text && "#" + header.text.split(" ").join("-").toLowerCase()
          }
        >
          {header.text && header.text}
        </a>
      </li>
    ));
  }, [documentation, currentHash]);

  return (
    <nav
      className={`-translate-x-full shadow-md bg-gray-50 absolute top-0 left-0 w-80 p-4 h-full overflow-y-auto border-r transition-transform duration-300 lg:translate-x-0 ${
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="font-bold">TABLE OF CONTENT</div>
        <div className="flex items-center gap-2 mt-4">
          <div className="bg-teal-500 p-2 rounded-full group-hover:bg-gray-50">
            {(documentation?.icon === "FaGears" && (
              <FaGears className="size-4 text-gray-50 md:size-5" />
            )) ||
              (documentation?.icon === "FaLaptopCode" && (
                <FaLaptopCode className="size-4 text-gray-50 md:size-5" />
              )) ||
              (documentation?.icon === "FaScrewdriverWrench" && (
                <FaScrewdriverWrench className="size-4 text-gray-50 md:size-5" />
              )) ||
              (documentation?.icon === "FaTabletScreenButton" && (
                <FaTabletScreenButton className="size-4 text-gray-50 md:size-5" />
              )) ||
              (documentation?.icon === "FaBookOpenReader" && (
                <FaBookOpenReader className="size-4 text-gray-50 md:size-5" />
              )) ||
              (documentation?.icon === "FaLightbulb" && (
                <FaLightbulb className="size-4 text-gray-50 md:size-5" />
              )) ||
              (documentation?.icon === "FaBox" && (
                <FaBox className="size-4 text-gray-50 md:size-5" />
              )) ||
              (documentation?.icon === "FaArrowDown" && (
                <FaArrowDown className="size-4 text-gray-50 md:size-5" />
              ))}
          </div>
          <h4 className="text-lg text-teal-400">
            <a
              onClick={toggleSidebar}
              href={
                documentation &&
                "#" + documentation.title.split(" ").join("-").toLowerCase()
              }
            >
              {documentation && documentation.title}
            </a>
          </h4>
        </div>
        <ol className="flex flex-col mt-3 ml-4">{contentList}</ol>
      </div>
    </nav>
  );
}
