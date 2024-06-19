import React, { useEffect, useRef, useState } from "react";
import {
  FaGears,
  FaLaptopCode,
  FaScrewdriverWrench,
  FaTabletScreenButton,
  FaBookOpenReader,
  FaLightbulb,
  FaBox,
  FaArrowDown,
  FaAngleDown,
} from "react-icons/fa6";
import { useRouter } from "next/router";

export default function FormMetadata(props) {
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isAuthorEmpty, setIsAuthorEmpty] = useState(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
  const [isTagsEmpty, setIsTagsEmpty] = useState(false);

  const router = useRouter();

  async function onCancel() {
    const hasFormChanges =
      JSON.stringify(props.originalFormData) !== JSON.stringify(props.formData);

    if (hasFormChanges) {
      if (
        confirm(
          "You are about to discard your changes. Are you sure you want to cancel?"
        )
      ) {
        if (router.isReady) {
          if (router.pathname.startsWith("/update/")) {
            props.setIsUpdatingDocs(false);
            await router.push(`/documentation/${router.query.slug}`);
          } else {
            props.setIsCreatingNewDocs(false);
            router.back();
          }
        }
      } else {
        return;
      }
    } else {
      if (router.isReady) {
        if (router.pathname.startsWith("/update/")) {
          props.setIsUpdatingDocs(false);
          await router.push(`/documentation/${router.query.slug}`);
        } else {
          props.setIsCreatingNewDocs(false);
          await router.push("/");
        }
      }
    }

    localStorage.removeItem("formData");
  }

  return (
    <div className="flex flex-col gap-4 w-full mx-auto px-8 py-8 bg-teal-500 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-center p-4 text-gray-100">
        {props.isUpdatingDocs ? "Edit " : props.isCreatingNewDocs ? "New " : ""}{" "}
        Documentation
      </h3>
      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-50" htmlFor="title">
          Title:
        </label>
        <input
          ref={props.titleRef}
          className="px-4 py-2 focus:outline-none"
          type="text"
          id="title"
          name="title"
          value={props.formData?.title}
          onChange={(e) => props.handleChange(e, "title", setIsTitleEmpty)}
          placeholder="Enter title..."
        />
        {isTitleEmpty && (
          <small className="text-red-600">* Title field is required</small>
        )}
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-50" htmlFor="author">
          Author:
        </label>
        <input
          ref={props.authorRef}
          className="px-4 py-2 focus:outline-none"
          type="text"
          id="author"
          name="author"
          value={props.formData?.author}
          onChange={(e) => props.handleChange(e, "author", setIsAuthorEmpty)}
          placeholder="Enter author..."
        />
        {isAuthorEmpty && (
          <small className="text-red-600">* Author field is required</small>
        )}
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-50" htmlFor="icon">
          Icon:
        </label>
        <button
          className="flex items-center justify-between w-full bg-gray-50 px-4 py-2"
          type="button"
          onClick={props.toggleIconOptions}
        >
          <span>{props.iconDisplayed}</span> <FaAngleDown />
        </button>
        <div className="relative w-full">
          <ul
            className={`absolute top-full left-0 w-96 overflow-hidden bg-white transition-all duration-300 rounded-md shadow-lg ${
              props.isIconOptionsOpen ? "h-[28rem]" : "h-0"
            }`}
          >
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaGears"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) => props.onSelectIcon(event, "FaGears")}
            >
              <span>Gears</span>{" "}
              <FaGears className="size-7 text-teal-500 md:size-8" />
            </li>
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaLaptopCode"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) => props.onSelectIcon(event, "FaLaptopCode")}
            >
              <span>Laptop Code</span>{" "}
              <FaLaptopCode className="size-7 text-teal-500 md:size-8" />
            </li>
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaScrewdriverWrench"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) =>
                props.onSelectIcon(event, "FaScrewdriverWrench")
              }
            >
              <span>Screwdriver Wrench</span>{" "}
              <FaScrewdriverWrench className="size-7 text-teal-500 md:size-8" />
            </li>
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaTabletScreenButton"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) =>
                props.onSelectIcon(event, "FaTabletScreenButton")
              }
            >
              <span>Tablet Screen Button</span>{" "}
              <FaTabletScreenButton className="size-7 text-teal-500 md:size-8" />
            </li>
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaBookOpenReader"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) => props.onSelectIcon(event, "FaBookOpenReader")}
            >
              <span>Book Open Reader</span>{" "}
              <FaBookOpenReader className="size-7 text-teal-500 md:size-8" />
            </li>
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaLightbulb"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) => props.onSelectIcon(event, "FaLightbulb")}
            >
              <span>Lightbulb</span>{" "}
              <FaLightbulb className="size-7 text-teal-500 md:size-8" />
            </li>
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaBox"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) => props.onSelectIcon(event, "FaBox")}
            >
              <span>Box</span>{" "}
              <FaBox className="size-7 text-teal-500 md:size-8" />
            </li>
            <li
              className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                props.selectedIcon === "FaArrowDown"
                  ? "bg-teal-200 hover:bg-teal-200"
                  : "hover:bg-teal-100"
              }`}
              onClick={(event) => props.onSelectIcon(event, "FaArrowDown")}
            >
              <span>Arrow Down</span>{" "}
              <FaArrowDown className="size-7 text-teal-500 md:size-8" />
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-50" htmlFor="description">
          Description:
        </label>
        <textarea
          ref={props.descriptionRef}
          className="px-4 py-2 focus:outline-none"
          id="description"
          name="description"
          value={props.formData?.description}
          placeholder="Enter description..."
          rows="4"
          cols="50"
          onChange={(e) =>
            props.handleChange(e, "description", setIsDescriptionEmpty)
          }
        ></textarea>
        {isDescriptionEmpty && (
          <small className="text-red-600">
            * Description field is required
          </small>
        )}
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-50" htmlFor="tags">
          Tags:
        </label>
        <input
          className="px-4 py-2 focus:outline-none"
          type="text"
          id="tags"
          name="tags"
          value={props.formData?.tags}
          onChange={(e) => props.handleChange(e, "tags", setIsTagsEmpty)}
          placeholder="javascript, frontend, web development"
        />
        {isTagsEmpty && (
          <small className="text-red-600">* Tags field is required</small>
        )}
      </div>

      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          className="px-4 py-2 text-center border border-teal-900 text-teal-900 rounded-lg mt-14 w-full"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-teal-900 text-gray-50 rounded-lg mt-14 w-full"
          type="button"
          onClick={props.handleFormNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
