import React, { Fragment, useEffect, useState } from "react";
import CodeSnippet from "./CodeSnippet";
import { formatToLongDate } from "../../utils/date";
import { FaTrashCan, FaPen } from "react-icons/fa6";

export default function PreviewDetail(props) {
  const today = new Date();

  const [formData, setFormData] = useState({
    title: props.documentation.title,
    author: props.documentation.author,
    icon: props.documentation.icon,
    description: props.documentation.description,
    tags: props.documentation.tags,
    content: [...props.documentation.content],
  });

  useEffect(() => {
    setFormData((prevData) => ({
      title: props.documentation.title,
      author: props.documentation.author,
      icon: props.documentation.icon,
      description: props.documentation.description,
      tags: props.documentation.tags,
      content: [...props.documentation.content],
    }));
  }, [props.documentation]);

  return (
    <Fragment>
      <div className="flex flex-col items-start gap-4 w-full lg:flex-row lg:justify-between lg:items-center">
        <div
          className={`relative w-full rounded-md ${
            formData.title.trim() !== "" &&
            "group cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
          }`}
        >
          <div
            onDoubleClick={() => props.editMetaData("title")}
            className="relative"
          >
            <div
              className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] gap-2 items-center ${
                formData.title.trim() !== "" && "group-hover:flex"
              }`}
            >
              <button
                className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                type="button"
                onClick={() => props.editMetaData("title")}
              >
                <FaPen />
              </button>
              <button
                className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                type="button"
                onClick={() => props.onRemoveMetaData("title")}
              >
                <FaTrashCan />
              </button>
            </div>
            <span
              className={`opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs transition-all duration-500 ${
                formData.title.trim() !== "" && "group-hover:opacity-100"
              }`}
            >
              Title
            </span>
            <h3
              className="text-5xl font-bold scroll-mt-24 max-w-3xl break-words"
              id={formData.title?.split(" ").join("-").toLowerCase()}
            >
              {formData.title}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-80">
          <div
            className={`relative w-full rounded-md ${
              formData.author.trim() !== "" &&
              "group cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
            }`}
          >
            <div
              onDoubleClick={() => props.editMetaData("author")}
              className="relative"
            >
              <span
                className={`opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs transition-all duration-500 ${
                  formData.author.trim() !== "" && "group-hover:opacity-100"
                }`}
              >
                Author
              </span>
              <div className="max-w-56">
                <small>Author: {formData.author}</small>
              </div>
              <div
                className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] gap-2 items-center ${
                  formData.author.trim() !== "" && "group-hover:flex"
                }`}
              >
                <button
                  className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                  type="button"
                  onClick={() => props.editMetaData("author")}
                >
                  <FaPen />
                </button>
                <button
                  type="button"
                  onClick={() => props.onRemoveMetaData("author")}
                  className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                  <FaTrashCan />
                </button>
              </div>
            </div>
          </div>
          <small className="whitespace-nowrap">
            Last update:{" "}
            {formData.updated_at
              ? formatToLongDate(formData.updated_at)
              : formatToLongDate(today)}
          </small>
        </div>
      </div>
      <div
        className={`relative w-full rounded-md ${
          formData.description.trim() !== "" &&
          "group cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
        }`}
      >
        <div
          onDoubleClick={() => props.editMetaData("description")}
          className="relative"
        >
          <span
            className={`opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs transition-all duration-500 ${
              formData.description.trim() !== "" && "group-hover:opacity-100"
            }`}
          >
            Description
          </span>
          <p className="mt-4 text-lg max-w-[59rem] break-words">
            {formData.description}
          </p>
          <div
            className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] gap-2 items-center ${
              formData.description.trim() !== "" && "group-hover:flex"
            }`}
          >
            <button
              className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
              type="button"
              onClick={() => props.editMetaData("description")}
            >
              <FaPen />
            </button>
            <button
              type="button"
              onClick={() => props.onRemoveMetaData("description")}
              className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
            >
              <FaTrashCan />
            </button>
          </div>
        </div>
      </div>
      {formData.content?.map((item, index) => {
        if (item.type === "Header") {
          return (
            <div
              className="group cursor-pointer relative w-full rounded-md hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
              key={index}
            >
              <div
                onDoubleClick={() => props.editContentItem(index)}
                className="relative"
              >
                <span className="opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs group-hover:opacity-100 transition-all duration-500">
                  Header
                </span>
                <h4
                  className="text-4xl mt-8 max-w-[59rem] break-words"
                  id={item && item.text?.split(" ").join("-").toLowerCase()}
                >
                  {item.text}
                </h4>
                <div
                  className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] group-hover:flex gap-2 items-center ${
                    formData.title === "" && "hidden"
                  }`}
                >
                  <button
                    className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                    type="button"
                    onClick={() => props.editContentItem(index)}
                  >
                    <FaPen />
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onRemoveContent(index)}
                    className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (item.type === "Paragraph") {
          return (
            <div
              className="group cursor-pointer relative w-full rounded-md hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
              key={index}
            >
              <div
                onDoubleClick={() => props.editContentItem(index)}
                className="relative"
              >
                <span className="opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs group-hover:opacity-100 transition-all duration-500">
                  Paragraph
                </span>
                <p className="mt-4 max-w-[59rem]">{item.text}</p>
                <div
                  className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] group-hover:flex gap-2 items-center ${
                    formData.title === "" && "hidden"
                  }`}
                >
                  <button
                    className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                    type="button"
                    onClick={() => props.editContentItem(index)}
                  >
                    <FaPen />
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onRemoveContent(index)}
                    className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (item.type === "Code Block") {
          return (
            <div
              className="group cursor-pointer relative w-full rounded-md hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
              key={index}
            >
              <div
                onDoubleClick={() => props.editContentItem(index)}
                className="relative"
              >
                <span className="opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs group-hover:opacity-100 transition-all duration-500">
                  Code Block
                </span>
                <div
                  className="p-4 max-w-[59rem]"
                  onDoubleClick={() => props.editContentItem(index)}
                >
                  <CodeSnippet language={item.language}>
                    {item.code}
                  </CodeSnippet>
                </div>
                <div
                  className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] group-hover:flex gap-2 items-center ${
                    formData.title === "" && "hidden"
                  }`}
                >
                  <button
                    className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                    type="button"
                    onClick={() => props.editContentItem(index)}
                  >
                    <FaPen />
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onRemoveContent(index)}
                    className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (item.type === "List") {
          return (
            <div
              className="group cursor-pointer relative w-full rounded-md hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
              key={index}
            >
              <div
                onDoubleClick={() => props.editContentItem(index)}
                className="relative"
              >
                <span className="opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs group-hover:opacity-100 transition-all duration-500">
                  List
                </span>
                <ol
                  onDoubleClick={() => props.editContentItem(index)}
                  key={index}
                  className={`flex flex-col gap-2 w-full mt-4 max-w-[59rem] ${
                    item.listType === "bulleted"
                      ? "list-disc list-inside"
                      : item.listType === "numbered"
                      ? "list-decimal list-inside"
                      : "list-none"
                  }`}
                >
                  {item.items?.map((listItem, i) => (
                    <li key={i}>{listItem}</li>
                  ))}
                </ol>
                <div
                  className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] group-hover:flex gap-2 items-center ${
                    formData.title === "" && "hidden"
                  }`}
                >
                  <button
                    className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                    type="button"
                    onClick={() => props.editContentItem(index)}
                  >
                    <FaPen />
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onRemoveContent(index)}
                    className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          );
        } else if (item.type === "Link") {
          return (
            <div
              className="group cursor-pointer relative w-full rounded-md hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
              key={index}
            >
              <div
                onDoubleClick={(e) => (
                  e.preventDefault(), props.editContentItem(index)
                )}
                className="relative"
              >
                <span className="opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs group-hover:opacity-100 transition-all duration-500">
                  Link
                </span>
                <a
                  href={item.url}
                  onClick={(e) => e.preventDefault()}
                  className="inline-block mt-4 max-w-[59rem]"
                >
                  {item.text}
                </a>
              </div>
              <div
                className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] group-hover:flex gap-2 items-center ${
                  formData.title === "" && "hidden"
                }`}
              >
                <button
                  className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                  type="button"
                  onClick={() => props.editContentItem(index)}
                >
                  <FaPen />
                </button>
                <button
                  type="button"
                  onClick={() => props.onRemoveContent(index)}
                  className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                  <FaTrashCan />
                </button>
              </div>
            </div>
          );
        } else if (item.type === "Image") {
          return (
            <div
              className="group cursor-pointer relative w-full rounded-md hover:outline-dashed hover:outline-1 hover:outline-offset-8 hover:outline-gray-400 hover:bg-gray-200"
              key={index}
            >
              <div
                onDoubleClick={() => props.editContentItem(index)}
                className="relative"
              >
                <span className="opacity-0 absolute top-full left-0 z-10 bg-teal-500 text-gray-50 rounded-lg px-2 py-1 text-xs group-hover:opacity-100 transition-all duration-500">
                  Image
                </span>
                <div
                  className="mt-12 mb-6 w-full h-auto aspect-video"
                  onDoubleClick={() => props.editContentItem(index)}
                >
                  <img
                    className="w-full h-auto aspect-video max-w-[59rem]"
                    key={index}
                    src={item.url}
                  />
                  {item.caption && (
                    <p className="italic text-sm text-center mt-2 max-w-[59rem]">
                      {item.caption}
                    </p>
                  )}
                </div>
                <div
                  className={`hidden bg-gray-50 px-2 py-1 rounded-md border absolute top-0 right-[0.5rem] group-hover:flex gap-2 items-center ${
                    formData.title === "" && "hidden"
                  }`}
                >
                  <button
                    className="text-teal-500 opacity-50 hover:opacity-100 transition-all duration-300"
                    type="button"
                    onClick={() => props.editContentItem(index)}
                  >
                    <FaPen />
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onRemoveContent(index)}
                    className="text-red-500 opacity-50 hover:opacity-100 transition-all duration-300"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </Fragment>
  );
}
